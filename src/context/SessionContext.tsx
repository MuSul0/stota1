import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface SessionContextType {
  session: Session | null;
  user: any | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user?.id);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user?.id);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId?: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    setIsAdmin(data?.role === 'admin');
  };

  return (
    <SessionContext.Provider value={{ session, user, isAdmin, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};