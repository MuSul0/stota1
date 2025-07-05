import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  // Login-Formularzustand
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Registrierung-Formularzustand
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [registerDisabled, setRegisterDisabled] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const role = session.user.user_metadata?.role;
        if (!role) {
          toast.error('Keine Rolle gefunden. Bitte wende dich an den Administrator.');
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
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message === 'Invalid login credentials') {
        toast.error('E-Mail oder Passwort ist falsch.');
      } else {
        toast.error('Fehler bei der Anmeldung: ' + error.message);
      }
    }
    setLoadingLogin(false);
  };

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerDisabled) {
      toast.error('Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.');
      return;
    }

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

    setLoadingRegister(true);
    setRegisterDisabled(true);

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
        if (error.message.includes('For security purposes')) {
          toast.error('Zu viele Anfragen. Bitte warten Sie eine Minute und versuchen Sie es erneut.');
        } else {
          toast.error('Fehler bei der Registrierung: ' + error.message);
        }
        setLoadingRegister(false);
        setRegisterDisabled(false);
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
          setLoadingRegister(false);
          setRegisterDisabled(false);
          return;
        }
        await sendWelcomeEmail(emailReg, 'kunde');
        toast.success('Registrierung erfolgreich! Bitte bestätige deine E-Mail.');
        setIsRegistering(false);
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
      setLoadingRegister(false);
      // Nach 60 Sekunden wieder aktivieren
      setTimeout(() => setRegisterDisabled(false), 60000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo className="w-32 h-32" />
        </div>

        {!isRegistering ? (
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">Anmelden</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="name@beispiel.de"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Passwort</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loadingLogin}>
                  {loadingLogin ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Anmelden...
                    </div>
                  ) : (
                    'Anmelden'
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-600">
                Noch kein Konto?{' '}
                <button
                  className="text-blue-600 hover:underline font-semibold"
                  onClick={() => setIsRegistering(true)}
                  disabled={loadingLogin}
                >
                  Jetzt registrieren
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">Registrierung</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Vorname</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nachname</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      required
                      placeholder="Mustermann"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emailReg">E-Mail-Adresse</Label>
                  <Input
                    id="emailReg"
                    type="email"
                    value={emailReg}
                    onChange={e => setEmailReg(e.target.value)}
                    required
                    placeholder="max@beispiel.de"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <Label htmlFor="passwordReg">Passwort</Label>
                  <Input
                    id="passwordReg"
                    type="password"
                    value={passwordReg}
                    onChange={e => setPasswordReg(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Mindestens 6 Zeichen"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <Label htmlFor="passwordConfirm">Passwort bestätigen</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Passwort wiederholen"
                    autoComplete="new-password"
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
                  <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-700">
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
                <Button type="submit" className="w-full" disabled={loadingRegister || registerDisabled}>
                  {loadingRegister ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Registrieren...
                    </div>
                  ) : (
                    'Registrieren'
                  )}
                </Button>
                {registerDisabled && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    Bitte warten Sie eine Minute, bevor Sie es erneut versuchen.
                  </p>
                )}
              </form>
              <div className="mt-6 text-center text-sm text-gray-600">
                Bereits ein Konto?{' '}
                <button
                  className="text-blue-600 hover:underline font-semibold"
                  onClick={() => setIsRegistering(false)}
                  disabled={loadingRegister}
                >
                  Zurück zum Login
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;