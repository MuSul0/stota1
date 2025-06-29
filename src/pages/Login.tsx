import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Truck, UserCog, User, ChevronLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'kunde' | 'mitarbeiter' | 'admin' | null>(null);

  const handleLogin = async (role: 'kunde' | 'mitarbeiter' | 'admin') => {
    setSelectedRole(role);
  };

  const handleAuthStateChange = async (event: string, session: any) => {
    if (event === 'SIGNED_IN' && selectedRole) {
      await supabase.auth.updateUser({ data: { role: selectedRole } });
      navigate(`/${selectedRole}portal`);
      toast.success('Erfolgreich angemeldet!');
    }
  };

  supabase.auth.onAuthStateChange(handleAuthStateChange);

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-red-500/10 border-red-500' :
           role === 'mitarbeiter' ? 'bg-green-500/10 border-green-500' :
           'bg-blue-500/10 border-blue-500';
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <UserCog className="w-6 h-6" /> :
           role === 'mitarbeiter' ? <Truck className="w-6 h-6" /> :
           <User className="w-6 h-6" />;
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
            
            <Card className={`p-6 cursor-pointer transition-all hover:shadow-md ${getRoleColor('kunde')}`} 
                  onClick={() => handleLogin('kunde')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  {getRoleIcon('kunde')}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Kunden Login</h2>
                  <p className="text-sm text-gray-600">Zugang für unsere Kunden</p>
                </div>
              </div>
            </Card>

            <Card className={`p-6 cursor-pointer transition-all hover:shadow-md ${getRoleColor('mitarbeiter')}`} 
                  onClick={() => handleLogin('mitarbeiter')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  {getRoleIcon('mitarbeiter')}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Mitarbeiter Login</h2>
                  <p className="text-sm text-gray-600">Zugang für unser Team</p>
                </div>
              </div>
            </Card>

            <Card className={`p-6 cursor-pointer transition-all hover:shadow-md ${getRoleColor('admin')}`} 
                  onClick={() => handleLogin('admin')}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  {getRoleIcon('admin')}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Admin Login</h2>
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
                <div className={`p-2 rounded-full ${getRoleColor(selectedRole)}`}>
                  {getRoleIcon(selectedRole)}
                </div>
                <h2 className="font-semibold text-xl">
                  {selectedRole === 'kunde' ? 'Kunden Login' : 
                   selectedRole === 'mitarbeiter' ? 'Mitarbeiter Login' : 'Admin Login'}
                </h2>
              </div>

              <Auth
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: selectedRole === 'admin' ? '#ef4444' : 
                               selectedRole === 'mitarbeiter' ? '#16a34a' : 
                               '#3b82f6',
                        brandAccent: selectedRole === 'admin' ? '#dc2626' : 
                                     selectedRole === 'mitarbeiter' ? '#166534' : 
                                     '#1d4ed8'
                      }
                    }
                  }
                }}
                providers={[]}
                theme="light"
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;