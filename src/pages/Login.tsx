import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, UserCog, User, Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Navigate based on user role
        const role = session?.user?.user_metadata?.role || 'kunde';
        navigate(`/${role}portal`);
        toast.success('Erfolgreich angemeldet!');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleRoleLogin = (role: string) => {
    // Set role in metadata before showing auth UI
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        supabase.auth.updateUser({
          data: { role }
        });
      }
    });
    
    return (
      <div className="w-full">
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: role === 'admin' ? 'hsl(346.8, 77.2%, 49.8%)' : 
                         role === 'mitarbeiter' ? 'hsl(142.1, 76.2%, 36.3%)' : 
                         'hsl(221.2, 83.2%, 53.3%)',
                  brandAccent: role === 'admin' ? 'hsl(346.8, 85%, 58.8%)' : 
                               role === 'mitarbeiter' ? 'hsl(142.1, 71.8%, 29.2%)' : 
                               'hsl(224.3, 76.3%, 48%)'
                }
              }
            }
          }}
          providers={[]}
          theme="light"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Willkommen bei Nikolai Transport</h1>
          <p className="text-xl text-gray-600">Bitte wählen Sie Ihren Zugang</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kunden Login */}
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-center">Kunden Login</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Zugang für unsere geschätzten Kunden zur Auftragsverwaltung
              </p>
              {handleRoleLogin('kunde')}
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" className="text-blue-600">
                Passwort vergessen?
              </Button>
            </CardFooter>
          </Card>

          {/* Mitarbeiter Login */}
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="p-4 bg-green-100 rounded-full">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-center">Mitarbeiter Login</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Zugang für unser Team zur Auftragsabwicklung
              </p>
              {handleRoleLogin('mitarbeiter')}
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" className="text-green-600">
                Passwort vergessen?
              </Button>
            </CardFooter>
          </Card>

          {/* Admin Login */}
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="p-4 bg-red-100 rounded-full">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Administrativer Zugang zur Systemverwaltung
              </p>
              {handleRoleLogin('admin')}
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" className="text-red-600">
                Passwort vergessen?
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12 text-gray-500">
          <p>Probleme beim Anmelden? Kontaktieren Sie unseren Support</p>
        </div>
      </div>
    </div>
  );
};

export default Login;