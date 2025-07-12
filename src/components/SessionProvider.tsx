import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface SessionContextType {
  session: Session | null;
  user: (User & { role?: string }) | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<(User & { role?: string }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async (userId: string) => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Fehler beim Laden der Rolle:', error);
        return null;
      }
      return profile?.role || null;
    };

    const handleAuthChange = async (event: string, session: Session | null) => {
      console.log('Auth state change event:', event);
      console.log('Current session in handler:', session);

      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        console.log('User signed out. Session and user state cleared.');
        navigate('/login');
      } else if (session) {
        setSession(session);
        const role = await getUserRole(session.user.id);
        setUser({ ...session.user, role: role || undefined });
        console.log('User signed in/updated. Session and user state set.');
      }
      setLoading(false);
      console.log('Loading state set to false.');
    };

    supabase.auth.getSession().then(({ data }) => {
      console.log('Initial session data:', data.session);
      if (data.session) {
        handleAuthChange('SIGNED_IN', data.session);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      console.log('Unsubscribing from auth state changes.');
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, user, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default SessionProvider;