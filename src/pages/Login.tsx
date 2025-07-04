import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Truck, UserCog, User, ChevronLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'kunde' | 'mitarbeiter' | 'admin' | null>(null);
  const [loading, setLoading] = useState(false);
  const [authView, setAuthView] = useState<'sign_in' | 'sign_up'>('sign_in');

  const handleLogin = (role: 'kunde' | 'mitarbeiter' | 'admin') => {
    setSelectedRole(role);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setLoading(true);

        // If role is selected during login, update user metadata
        if (selectedRole) {
          const { error } = await supabase.auth.updateUser({
            data: { role: selectedRole }
          });
          if (error) {
            toast.error('Fehler beim Setzen der Rolle');
            setLoading(false);
            return;
          }
        }

        // Fetch fresh user data to get role from metadata
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
          toast.error('Fehler beim Abrufen der Benutzerdaten');
          setLoading(false);
          return;
        }

        const role = userData.user.user_metadata?.role;

        if (!role) {
          toast.error('Keine Rolle gefunden. Bitte erneut anmelden.');
          setLoading(false);
          return;
        }

        toast.success('Anmeldung erfolgreich!');

        // Redirect based on role
        switch (role) {
          case 'kunde':
            navigate('/kundenportal');
            break;
          case 'mitarbeiter':
            navigate('/mitarbeiterportal');
            break;
          case 'admin':
            navigate('/adminportal');
            break;
          default:
            navigate('/');
            break;
        }

        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate, selectedRole]);

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

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'kunde':
        return 'Kunden-Login';
      case 'mitarbeiter':
        return 'Mitarbeiter-Login';
      case 'admin':
        return 'Admin-Login';
      default:
        return '';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'kunde':
        return 'Zugang für unsere Kunden';
      case 'mitarbeiter':
        return 'Zugang für unser Team';
      case 'admin':
        return 'Administrativer Zugang';
      default:
        return '';
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
            
            <Card 
              className={`p-6 cursor-pointer transition-all hover:shadow-md ${getRoleColor('kunde')}`} 
              onClick={() => handleLogin('kunde')}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin('kunde'); }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  {getRoleIcon('kunde')}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{getRoleTitle('kunde')}</h2>
                  <p className="text-sm text-gray-600">{getRoleDescription('kunde')}</p>
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer transition-all hover:shadow-md ${getRoleColor('mitarbeiter')}`} 
              onClick={() => handleLogin('mitarbeiter')}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin('mitarbeiter'); }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  {getRoleIcon('mitarbeiter')}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{getRoleTitle('mitarbeiter')}</h2>
                  <p className="text-sm text-gray-600">{getRoleDescription('mitarbeiter')}</p>
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer transition-all hover:shadow-md ${getRoleColor('admin')}`} 
              onClick={() => handleLogin('admin')}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin('admin'); }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  {getRoleIcon('admin')}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{getRoleTitle('admin')}</h2>
                  <p className="text-sm text-gray-600">{getRoleDescription('admin')}</p>
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
              disabled={loading}
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück zur Auswahl
            </Button>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 rounded-full ${getRoleColor(selectedRole)}`}>
                  {getRoleIcon(selectedRole!)}
                </div>
                <h2 className="font-semibold text-xl capitalize">
                  {getRoleTitle(selectedRole!)}
                </h2>
              </div>

              <Auth
                supabaseClient={supabase}
                view={authView}
                onViewChange={(view) => setAuthView(view)}
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
                      },
                      fonts: {
                        bodyFontFamily: 'Inter, sans-serif',
                        buttonFontFamily: 'Inter, sans-serif',
                        inputFontFamily: 'Inter, sans-serif',
                        labelFontFamily: 'Inter, sans-serif'
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
                        loading_button_label: 'Anmeldung läuft...',
                        link_text: 'Noch kein Konto? Registrieren',
                        social_provider_text: 'Oder mit einem sozialen Konto anmelden'
                      },
                      sign_up: {
                        email_label: 'E-Mail-Adresse',
                        password_label: 'Passwort',
                        email_input_placeholder: 'Ihre E-Mail-Adresse',
                        password_input_placeholder: 'Ihr Passwort',
                        button_label: 'Registrieren',
                        loading_button_label: 'Registrierung läuft...',
                        link_text: 'Bereits registriert? Hier anmelden'
                      },
                      forgotten_password: {
                        email_label: 'E-Mail-Adresse',
                        email_input_placeholder: 'Ihre E-Mail-Adresse',
                        button_label: 'Passwort zurücksetzen',
                        loading_button_label: 'Sende E-Mail...',
                        link_text: 'Zurück zum Login'
                      },
                      update_password: {
                        password_label: 'Neues Passwort',
                        password_input_placeholder: 'Neues Passwort eingeben',
                        button_label: 'Passwort aktualisieren',
                        loading_button_label: 'Aktualisiere Passwort...'
                      },
                      magic_link: {
                        email_input_label: 'E-Mail-Adresse',
                        email_input_placeholder: 'Ihre E-Mail-Adresse',
                        button_label: 'Link senden',
                        loading_button_label: 'Sende Link...',
                        link_text: 'Oder mit Passwort anmelden'
                      },
                      email_otp: {
                        email_input_label: 'E-Mail-Adresse',
                        email_input_placeholder: 'Ihre E-Mail-Adresse',
                        button_label: 'Code senden',
                        loading_button_label: 'Sende Code...',
                        link_text: 'Oder mit Passwort anmelden',
                        user_input_label: 'Code eingeben',
                        user_input_placeholder: 'Geben Sie den Code ein',
                        error_invalid_code: 'Ungültiger Code',
                        error_invalid_email_address: 'Ungültige E-Mail-Adresse'
                      },
                      phone_otp: {
                        phone_input_label: 'Telefonnummer',
                        phone_input_placeholder: 'Ihre Telefonnummer',
                        button_label: 'Code senden',
                        loading_button_label: 'Sende Code...',
                        link_text: 'Oder mit Passwort anmelden',
                        user_input_label: 'Code eingeben',
                        user_input_placeholder: 'Geben Sie den Code ein',
                        error_invalid_code: 'Ungültiger Code',
                        error_invalid_phone_number: 'Ungültige Telefonnummer'
                      },
                      user_update: {
                        button_label: 'Aktualisieren',
                        loading_button_label: 'Aktualisiere...'
                      },
                      errors: {
                        email_required: 'E-Mail ist erforderlich',
                        password_required: 'Passwort ist erforderlich',
                        invalid_email_address: 'Ungültige E-Mail-Adresse',
                        invalid_password: 'Ungültiges Passwort',
                        user_not_found: 'Benutzer nicht gefunden',
                        invalid_login_credentials: 'Ungültige Anmeldedaten',
                        invalid_otp: 'Ungültiger Code',
                        invalid_verification_link: 'Ungültiger Verifizierungslink',
                        expired_verification_link: 'Verifizierungslink abgelaufen',
                        verification_failed: 'Verifizierung fehlgeschlagen',
                        password_mismatch: 'Passwörter stimmen nicht überein',
                        password_strength: 'Passwort ist zu schwach'
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