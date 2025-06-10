import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuthStateChange = async (event: string, session: any) => {
    if (event === 'SIGNED_IN') {
      setLoading(true);
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin');
        } else {
          await supabase.auth.signOut();
          toast.error('Keine Admin-Berechtigungen');
        }
      } catch (error) {
        toast.error('Fehler bei der Anmeldung');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    return () => subscription.unsubscribe();
  }, [navigate]);

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