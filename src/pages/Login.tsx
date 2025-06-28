import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [activeTab, setActiveTab] = useState('kunde');

  const handleAuthStateChange = async (event: string, session: any) => {
    if (event === 'SIGNED_IN') {
      const { data: userData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!userData) {
        toast.error('Ihr Konto wurde nicht gefunden');
        return;
      }

      // Überprüfen der Rolle und Weiterleitung
      if (activeTab === 'admin' && userData.role !== 'admin') {
        toast.error('Sie haben keine Admin-Berechtigungen');
        await supabase.auth.signOut();
        return;
      }

      if (activeTab === 'mitarbeiter' && userData.role !== 'mitarbeiter') {
        toast.error('Sie haben keine Mitarbeiter-Berechtigungen');
        await supabase.auth.signOut();
        return;
      }

      toast.success('Erfolgreich angemeldet!');
      navigate(activeTab === 'kunde' ? '/' : `/${activeTab}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle>Willkommen bei Nikolai Transport</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="kunde">Kunde</TabsTrigger>
              <TabsTrigger value="mitarbeiter">Mitarbeiter</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="kunde">
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                localization={{ variables: germanTranslations }}
                onAuthStateChange={handleAuthStateChange}
              />
            </TabsContent>
            
            <TabsContent value="mitarbeiter">
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                localization={{ variables: germanTranslations }}
                onAuthStateChange={handleAuthStateChange}
              />
            </TabsContent>
            
            <TabsContent value="admin">
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                localization={{ variables: germanTranslations }}
                onAuthStateChange={handleAuthStateChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;