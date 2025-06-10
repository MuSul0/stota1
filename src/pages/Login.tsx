import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const navigate = useNavigate();

  // Überprüfe bestehende Session beim Mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        if (session) {
          await handleUserSession(session);
        }
      } catch (error) {
        console.error('Session check error:', error);
        toast.error('Fehler bei der Sitzungsüberprüfung');
      } finally {
        setSessionChecked(true);
      }
    };

    checkSession();
  }, []);

  // Behandle Auth State Changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await handleUserSession(session);
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleUserSession = async (session: any) => {
    setLoading(true);
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        await supabase.auth.signOut();
        toast.error('Keine Admin-Berechtigungen');
      }
    } catch (error) {
      console.error('Session handling error:', error);
      toast.error('Fehler bei der Anmeldung');
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Auth
              supabaseClient={supabase}
              providers={['google']}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3b82f6',
                      brandAccent: '#2563eb'
                    }
                  }
                }
              }}
              theme="dark"
            />
          )}
        </div>
        <div className="bg-gray-100 px-6 py-4 text-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-blue-600"
          >
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;