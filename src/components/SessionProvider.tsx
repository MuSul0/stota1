import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface SessionContextType {
  session: Session | null;
  user: (User & { role?: string }) | null;
  loading: boolean;
  refreshSession: () => Promise<void>; // Neue Funktion hinzugefügt
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<(User & { role?: string }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
    console.log(`[SessionProvider] Abgerufene Rolle für Benutzer ${userId}:`, profile?.role);
    return profile?.role || null;
  };

  const handleAuthChange = async (event: string, session: Session | null) => {
    console.log('[SessionProvider] Auth state change event:', event);
    console.log('[SessionProvider] Aktuelle Sitzung im Handler:', session);

    if (event === 'SIGNED_OUT') {
      setSession(null);
      setUser(null);
      console.log('[SessionProvider] Benutzer abgemeldet. Sitzung und Benutzerstatus gelöscht.');
      navigate('/login');
    } else if (session) {
      setSession(session);
      const role = await getUserRole(session.user.id);
      const userWithRole = { ...session.user, role: role || undefined };
      setUser(userWithRole);
      console.log('[SessionProvider] Benutzer angemeldet/aktualisiert. Sitzung und Benutzerstatus gesetzt:', userWithRole);
    }
    setLoading(false);
    console.log('[SessionProvider] Ladezustand auf false gesetzt.');
  };

  const refreshSession = async () => { // Implementierung der neuen Funktion
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    console.log('[SessionProvider] Manuell aktualisierte Sitzungsdaten:', data.session);
    if (data.session) {
      await handleAuthChange('SIGNED_IN', data.session);
    } else {
      await handleAuthChange('SIGNED_OUT', null);
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('[SessionProvider] Initiale Sitzungsdaten:', data.session);
      if (data.session) {
        handleAuthChange('SIGNED_IN', data.session);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      console.log('[SessionProvider] Abmeldung von Auth-Statusänderungen.');
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, user, loading, refreshSession }}>
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