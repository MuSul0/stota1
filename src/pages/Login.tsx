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

  // Registrierungsfelder
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLogin = (role: 'kunde' | 'mitarbeiter' | 'admin') => {
    setSelectedRole(role);
    setAuthView('sign_in');
  };

  // Funktion zum Senden der Willkommensmail via Supabase Edge Function
  const sendWelcomeEmail = async (email: string, role: string) => {
    try {
      const res = await fetch('/.netlify/functions/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      if (!res.ok) {
        const data = await res.json();
        console.error('Fehler beim Senden der Willkommensmail:', data.error);
      }
    } catch (error) {
      console.error('Fehler beim Senden der Willkommensmail:', error);
    }
  };

  // Registrierung mit erweiterten Feldern
  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }
    if (password !== passwordConfirm) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }
    if (!termsAccepted) {
      toast.error('Bitte stimmen Sie den Nutzungsbedingungen und der Datenschutzerklärung zu');
      return;
    }

    setLoading(true);
    try {
      // Registrierung mit Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'kunde',
            first_name: firstName.trim(),
            last_name: lastName.trim()
          }
        }
      });

      if (error) {
        toast.error('Fehler bei der Registrierung: ' + error.message);
        setLoading(false);
        return;
      }

      // Profil in Tabelle profiles anlegen (optional, falls separate Tabelle)
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email,
            role: 'kunde',
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            created_at: new Date().toISOString()
          }, { onConflict: 'id' });

        if (profileError) {
          toast.error('Fehler beim Anlegen des Profils');
          setLoading(false);
          return;
        }

        // Willkommensmail senden
        await sendWelcomeEmail(email, 'kunde');

        toast.success('Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail.');
        setAuthView('sign_in');
        setSelectedRole('kunde');
        // Felder zurücksetzen
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setTermsAccepted(false);
      }
    } catch (error) {
      toast.error('Unbekannter Fehler bei der Registrierung');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setLoading(true);

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

            {authView === 'sign_in' ? (
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
                  view="sign_in"
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
                          link_text: 'Registrieren',
                          social_provider_text: 'Oder mit einem sozialen Konto anmelden'
                        },
                        forgotten_password: {
                          email_label: 'E-Mail-Adresse',
                          email_input_placeholder: 'Ihre E-Mail-Adresse',
                          button_label: 'Passwort zurücksetzen',
                          loading_button_label: 'Sende E-Mail...',
                          link_text: 'Zurück zum Login'
                        }
                      }
                    }
                  }}
                  providers={[]}
                  theme="light"
                  redirectTo="/"
                />
                <div className="mt-4 text-center">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setAuthView('sign_up')}
                    disabled={loading}
                  >
                    Noch kein Konto? Jetzt registrieren
                  </button>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Registrierung</h2>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleRegister();
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Vorname *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nachname *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-Mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Passwort *
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                      Passwort bestätigen *
                    </label>
                    <input
                      id="passwordConfirm"
                      type="password"
                      value={passwordConfirm}
                      onChange={e => setPasswordConfirm(e.target.value)}
                      required
                      minLength={6}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="termsAccepted"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={e => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                      Ich stimme den{' '}
                      <a href="/nutzungsbedingungen" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Nutzungsbedingungen
                      </a>{' '}
                      und der{' '}
                      <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Datenschutzerklärung
                      </a>{' '}
                      zu.
                    </label>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    {loading ? 'Registriere...' : 'Registrieren'}
                  </Button>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="text-gray-600 hover:underline text-sm"
                      onClick={() => setAuthView('sign_in')}
                      disabled={loading}
                    >
                      Bereits ein Konto? Jetzt anmelden
                    </button>
                  </div>
                </form>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;