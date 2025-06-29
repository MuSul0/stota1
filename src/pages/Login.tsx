import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'kunde' | 'mitarbeiter' | 'admin' | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const role = session?.user?.user_metadata?.role || selectedRole || 'kunde';
        navigate(`/${role}portal`);
        toast.success('Erfolgreich angemeldet!');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, selectedRole]);

  const handleRoleSelect = (role: 'kunde' | 'mitarbeiter' | 'admin') => {
    setSelectedRole(role);
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        supabase.auth.updateUser({ data: { role } });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="w-32 h-32 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Willkommen zurück</h2>
        </div>

        {!selectedRole ? (
          <div className="space-y-4">
            <Button 
              onClick={() => handleRoleSelect('kunde')}
              className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Als Kunde anmelden
            </Button>
            
            <Button 
              onClick={() => handleRoleSelect('mitarbeiter')}
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700"
            >
              Als Mitarbeiter anmelden
            </Button>
            
            <Button 
              onClick={() => handleRoleSelect('admin')}
              className="w-full py-6 text-lg bg-red-600 hover:bg-red-700"
            >
              Als Admin anmelden
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: selectedRole === 'admin' ? '#dc2626' : 
                             selectedRole === 'mitarbeiter' ? '#16a34a' : 
                             '#2563eb',
                      brandAccent: selectedRole === 'admin' ? '#ef4444' : 
                                   selectedRole === 'mitarbeiter' ? '#22c55e' : 
                                   '#3b82f6'
                    }
                  }
                }
              }}
              providers={[]}
              theme="light"
            />
            <Button 
              variant="outline" 
              onClick={() => setSelectedRole(null)}
              className="w-full"
            >
              Zurück zur Auswahl
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;