import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

// Deutsche Übersetzung für Auth UI
const germanTranslations = {
  sign_in: {
    email_label: 'E-Mail-Adresse',
    password_label: 'Passwort',
    email_input_placeholder: 'Ihre E-Mail-Adresse',
    password_input_placeholder: 'Ihr Passwort',
    button_label: 'Anmelden',
    loading_button_label: 'Anmeldung läuft...',
    link_text: 'Bereits ein Konto? Anmelden',
  },
  sign_up: {
    link_text: 'Noch kein Konto? Registrieren',
  },
  forgotten_password: {
    link_text: 'Passwort vergessen?',
  },
  magic_link: {
    link_text: 'Magischen Link per E-Mail senden',
  },
};

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) navigate('/admin');
      } catch (error) {
        console.error('Login-Fehler:', error);
        toast.error('Anmeldefehler aufgetreten');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/admin');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Administrator-Anmeldung</h2>
          <Auth
            supabaseClient={supabase}
            providers={[]}
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
            localization={{
              variables: germanTranslations
            }}
          />
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Zugang nur für autorisierte Administratoren</p>
          </div>
        </div>
      </div>
    </div>
  );
}