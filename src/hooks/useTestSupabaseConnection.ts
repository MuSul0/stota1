import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTestSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles') // Or any other table you have
          .select('*')
          .limit(1);

        if (error) {
          console.error('Supabase connection error:', error);
          setIsConnected(false);
        } else {
          console.log('Supabase connection successful!', data);
          setIsConnected(true);
        }
      } catch (err) {
        console.error('Unexpected error testing Supabase:', err);
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  return isConnected;
};