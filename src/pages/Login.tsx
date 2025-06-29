import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Truck, UserCog, User, ChevronLeft } from 'lucide-react';

// Feste Admin-Anmeldedaten
const ADMIN_CREDENTIALS = {
  email: 'muhamadsuleiman2@gmail.com',
  password: 'MOsulcan1'
};

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'kunde' | 'mitarbeiter' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_CREDENTIALS.email,
        password: ADMIN_CREDENTIALS.password
      });
      
      if (!error) {
        await supabase.auth.updateUser({ data: { role: 'admin' } });
        navigate('/adminportal');
        toast.success('Admin-Login erfolgreich!');
      } else {
        toast.error('Anmeldung fehlgeschlagen');
      }
    } else {
      toast.error('Ungültige Admin-Anmeldedaten');
    }
  };

  const handleMitarbeiterLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error && data.user) {
      const { data: userData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (userData?.role === 'mitarbeiter') {
        navigate('/mitarbeiterportal');
        toast.success('Mitarbeiter-Login erfolgreich!');
      } else {
        toast.error('Kein Mitarbeiter-Zugang');
        await supabase.auth.signOut();
      }
    } else {
      toast.error('Anmeldung fehlgeschlagen');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Logo className="w-40 h-40" />
        </div>

        {!selectedRole ? (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Willkommen bei Nikolai Transport</h1>
            <p className="text-gray-600 text-center mb-8">Bitte wählen Sie Ihren Zugang</p>
            
            <Card className="p-6 cursor-pointer transition-all hover:shadow-md bg-blue-500/10 border-blue-500" 
                  onClick={() => setSelectedRole('kunde')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Kunden-Login</h2>
                  <p className="text-sm text-gray-600">Zugang für unsere Kunden</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 cursor-pointer transition-all hover:shadow-md bg-green-500/10 border-green-500" 
                  onClick={() => setSelectedRole('mitarbeiter')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Mitarbeiter-Login</h2>
                  <p className="text-sm text-gray-600">Zugang für unser Team</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 cursor-pointer transition-all hover:shadow-md bg-red-500/10 border-red-500" 
                  onClick={() => setSelectedRole('admin')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <UserCog className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Admin-Login</h2>
                  <p className="text-sm text-gray-600">Administrativer Zugang</p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2 text-gray-600"
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück zur Auswahl
            </Button>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 rounded-full ${
                  selectedRole === 'admin' ? 'bg-red-500/10 border-red-500' :
                  selectedRole === 'mitarbeiter' ? 'bg-green-500/10 border-green-500' :
                  'bg-blue-500/10 border-blue-500'
                }`}>
                  {selectedRole === 'admin' ? <UserCog className="w-6 h-6" /> :
                   selectedRole === 'mitarbeiter' ? <Truck className="w-6 h-6" /> :
                   <User className="w-6 h-6" />}
                </div>
                <h2 className="font-semibold text-xl">
                  {selectedRole === 'kunde' ? 'Kunden-Login' : 
                   selectedRole === 'mitarbeiter' ? 'Mitarbeiter-Login' : 'Admin-Login'}
                </h2>
              </div>

              {selectedRole === 'admin' ? (
                <form onSubmit={handleAdminLogin}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      Als Admin anmelden
                    </Button>
                  </div>
                </form>
              ) : selectedRole === 'mitarbeiter' ? (
                <form onSubmit={handleMitarbeiterLogin}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Als Mitarbeiter anmelden
                    </Button>
                  </div>
                </form>
              ) : (
                <Auth
                  supabaseClient={supabase}
                  appearance={{ 
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: '#3b82f6',
                          brandAccent: '#1d4ed8'
                        }
                      }
                    },
                    localization: {
                      variables: {
                        sign_in: {
                          email_label: 'E-Mail-Adresse',
                          password_label: 'Passwort',
                          email_input_placeholder: 'Ihre E-Mail-Adresse',
                          password_input_placeholder: 'Ihr Passwort',
                          button_label: 'Anmelden',
                          loading_button_label: 'Anmeldung läuft...'
                        }
                      }
                    }
                  }}
                  providers={[]}
                  theme="light"
                />
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;