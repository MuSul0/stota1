import { useContext } from 'react';
import { SessionContext } from '@/context/SessionContext';
import { Session } from '@supabase/supabase-js';

export const useSession = () => {
  const context = useContext(SessionContext);
  
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return {
    session: context.session,
    user: context.user,
    isLoading: context.isLoading,
    isAdmin: context.isAdmin
  };
};

export type SessionContextType = {
  session: Session | null;
  user: any | null;
  isLoading: boolean;
  isAdmin: boolean;
};