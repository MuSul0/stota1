import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    if (password.length < 6) {
      toast.error('Das Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    setLoading(true);

    try {
      // Benutzer registrieren
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: 'kunde', first_name: name.trim() }
        }
      });

      if (error) {
        toast.error('Registrierung fehlgeschlagen: ' + error.message);
        setLoading(false);
        return;
      }

      // Profil in Tabelle anlegen
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            first_name: name.trim(),
            role: 'kunde',
            created_at: new Date().toISOString()
          });

        if (profileError) {
          toast.error('Fehler beim Anlegen des Profils');
          setLoading(false);
          return;
        }
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Logo className="mx-auto w-32 h-32" />
          <CardTitle className="text-2xl">Registrieren</CardTitle>
          <CardDescription className="text-gray-600">
            Erstellen Sie ein Konto, um auf das Kundenportal zuzugreifen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ihr vollständiger Name"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@beispiel.de"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mindestens 6 Zeichen"
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Registrieren'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Bereits registriert?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Hier anmelden
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;