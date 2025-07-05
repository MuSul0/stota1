import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authView, setAuthView] = useState<'sign_in' | 'sign_up'>('sign_in');

  // Registrierungsfelder für Kunden
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setLoading(true);

        // Rolle aus user_metadata auslesen
        const role = session.user.user_metadata?.role;

        if (!role) {
          toast.error('Keine Rolle gefunden. Bitte wende dich an den Administrator.');
          setLoading(false);
          await supabase.auth.signOut();
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
  }, [navigate]);

  // Registrierung nur für Kunden
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

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !emailReg.trim() || !passwordReg) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }
    if (passwordReg !== passwordConfirm) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }
    if (!termsAccepted) {
      toast.error('Bitte stimme den Nutzungsbedingungen und der Datenschutzerklärung zu');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailReg,
        password: passwordReg,
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

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: emailReg,
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

        await sendWelcomeEmail(emailReg, 'kunde');

        toast.success('Registrierung erfolgreich! Bitte bestätige deine E-Mail.');
        setAuthView('sign_in');

        // Felder zurücksetzen
        setFirstName('');
        setLastName('');
        setEmailReg('');
        setPasswordReg('');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Logo className="w-40 h-40" />
        </div>

        {authView === 'sign_in' ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Anmelden</h2>
            <Auth
              supabaseClient={supabase}
              view="sign_in"
              onViewChange={(view) => setAuthView(view)}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3b82f6',
                      brandAccent: '#1d4ed8'
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
                      link_text: '' // Link entfernen
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
            <h2 className="text-xl font-semibold mb-4 text-center">Registrierung</h2>
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
                <label htmlFor="emailReg" className="block text-sm font-medium text-gray-700">
                  E-Mail *
                </label>
                <input
                  id="emailReg"
                  type="email"
                  value={emailReg}
                  onChange={e => setEmailReg(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="passwordReg" className="block text-sm font-medium text-gray-700">
                  Passwort *
                </label>
                <input
                  id="passwordReg"
                  type="password"
                  value={passwordReg}
                  onChange={e => setPasswordReg(e.target.value)}
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
    </div>
  );
};

export default Login;