import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const germanTranslations = {
  sign_in: {
    email_label: 'E-Mail-Adresse',
    password_label: 'Passwort',
    email_input_placeholder: 'Ihre E-Mail-Adresse',
    password_input_placeholder: 'Ihr Passwort',
    button_label: 'Anmelden',
    link_text: 'Bereits registriert? Anmelden',
  },
  sign_up: {
    link_text: 'Noch kein Konto? Registrieren',
  },
  forgotten_password: {
    link_text: 'Passwort vergessen?',
  },
};

const Login = () => {
  const navigate = useNavigate();

  const handleAuthStateChange = async (event: string) => {
    if (event === 'SIGNED_IN') {
      toast.success('Erfolgreich angemeldet!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Willkommen bei Nikolai Transport</h1>
          
          <Auth
            supabaseClient={supabase}
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
            localization={{ variables: germanTranslations }}
            onAuthStateChange={handleAuthStateChange}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;