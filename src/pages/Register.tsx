import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    if (password.length < 6) {
      toast.error('Das Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('Die Passwörter stimmen nicht überein');
      return;
    }

    if (!agreeTerms) {
      toast.error('Bitte stimmen Sie den Nutzungsbedingungen und der Datenschutzerklärung zu');
      return;
    }

    setLoading(true);

    try {
      // Benutzer registrieren
      // Der Datenbank-Trigger 'handle_new_user' wird das Profil in der 'profiles'-Tabelle anlegen.
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: 'kunde', first_name: firstName.trim(), last_name: lastName.trim() }
        }
      });

      if (error) {
        if (error.message.includes('email rate limit exceeded')) {
          toast.error('Registrierung fehlgeschlagen: Zu viele Versuche. Bitte warten Sie einen Moment und versuchen Sie es erneut.');
        } else {
          toast.error('Registrierung fehlgeschlagen: ' + error.message);
        }
        setLoading(false);
        return;
      }

      toast.success('Registrierung erfolgreich! Bitte prüfen Sie Ihre E-Mails zur Bestätigung.');
      navigate('/login');
    } catch (error) {
      toast.error('Unbekannter Fehler bei der Registrierung');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-600 to-purple-700 px-4">
      <Card className="max-w-md w-full p-10 rounded-3xl shadow-2xl bg-white/95 backdrop-blur-md border border-white/40">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Logo />
          <div className="text-center">
            <CardTitle className="text-3xl font-extrabold text-gray-900">Neu hier? Registrieren</CardTitle>
            <CardDescription className="text-gray-600 max-w-xs mx-auto">
              Erstellen Sie ein Konto, um auf das Kundenportal zuzugreifen.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="block text-gray-700 font-semibold mb-1">Vorname</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ihr Vorname"
                  required
                  autoComplete="given-name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="block text-gray-700 font-semibold mb-1">Nachname</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ihr Nachname"
                  required
                  autoComplete="family-name"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="block text-gray-700 font-semibold mb-1">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@beispiel.de"
                required
                autoComplete="email"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 6 Zeichen"
                  required
                  autoComplete="new-password"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="passwordConfirm" className="block text-gray-700 font-semibold mb-1">Passwort bestätigen</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Passwort wiederholen"
                  required
                  autoComplete="new-password"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                required
              />
              <Label htmlFor="agreeTerms" className="text-gray-700 text-sm select-none">
                Ich stimme den Nutzungsbedingungen und der{' '}
                <Link to="/datenschutz" className="text-blue-600 hover:underline">
                  Datenschutzerklärung
                </Link>{' '}
                zu.
              </Label>
            </div>
            <Button 
              type="submit" 
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all duration-300"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Registrieren'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-700 select-none text-sm">
            <strong>E-Mail-Bestätigung erforderlich</strong><br />
            Nach der Registrierung erhalten Sie eine E-Mail mit einem Bestätigungslink. Bitte klicken Sie darauf, um Ihr Konto zu aktivieren.
          </p>

          <p className="mt-4 text-center text-gray-700 select-none text-sm">
            Bereits registriert?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Hier anmelden
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;