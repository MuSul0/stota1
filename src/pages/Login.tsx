import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

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

export default function Login() {
  const [activeTab, setActiveTab] = useState('customer');
  const navigate = useNavigate();

  const handleAuthStateChange = async (event: string) => {
    if (event === 'SIGNED_IN') {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.email?.endsWith('@nikolai-transport.de')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="customer">Kunde</TabsTrigger>
              <TabsTrigger value="employee">Mitarbeiter</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customer" className="mt-6">
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
                localization={{ variables: germanTranslations }}
                onAuthStateChange={handleAuthStateChange}
              />
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Kundenbereich für Auftragsverfolgung und Serviceanfragen</p>
              </div>
            </TabsContent>
            
            <TabsContent value="employee" className="mt-6">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#10b981',
                        brandAccent: '#059669'
                      }
                    }
                  }
                }}
                localization={{ variables: germanTranslations }}
                onAuthStateChange={handleAuthStateChange}
              />
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Mitarbeiterbereich für Dienstplan und Auftragsverwaltung</p>
              </div>
            </TabsContent>
            
            <TabsContent value="admin" className="mt-6">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#8b5cf6',
                        brandAccent: '#7c3aed'
                      }
                    }
                  }
                }}
                localization={{ variables: germanTranslations }}
                onAuthStateChange={handleAuthStateChange}
              />
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Administrationsbereich für Systemeinstellungen</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <Button variant="link" asChild>
              <a href="/kontakt">Hilfe benötigt? Kontaktieren Sie uns</a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}