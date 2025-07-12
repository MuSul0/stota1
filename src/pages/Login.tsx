import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import PasswordReset from '@/components/PasswordReset';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useSession } from '@/components/SessionProvider';

const Login = () => {
  const { session, loading: sessionLoading } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Die Weiterleitung wird jetzt zentral vom SessionProvider gehandhabt
    } catch (error: any) {
      toast.error('Anmeldung fehlgeschlagen: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Zeigt einen Lade-Spinner an, während die Sitzung geprüft und der Benutzer weitergeleitet wird
  if (sessionLoading || session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-600 to-purple-700">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-600 to-purple-700 px-4">
      <Card className="max-w-md w-full p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-white/30">
        <CardHeader className="flex flex-col items-center space-y-6">
          <Logo />
          <div className="text-center">
            <CardTitle className="text-3xl font-extrabold text-gray-900">Willkommen zurück</CardTitle>
            <CardDescription className="text-gray-600">
              Melden Sie sich mit Ihrer E-Mail und Ihrem Passwort an, um fortzufahren.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-semibold">E-Mail</Label>
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
            <div>
              <Label htmlFor="password" className="text-gray-700 font-semibold">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ihr Passwort"
                required
                autoComplete="current-password"
                className="mt-1"
              />
            </div>
            <div className="flex justify-between items-center">
              <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" size="sm" className="p-0 text-blue-600 hover:underline">
                    Passwort vergessen?
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Passwort zurücksetzen</DialogTitle>
                    <DialogDescription>
                      Geben Sie Ihre E-Mail-Adresse ein, um eine E-Mail zum Zurücksetzen des Passworts zu erhalten.
                    </DialogDescription>
                  </DialogHeader>
                  <PasswordReset onClose={() => setIsResetOpen(false)} />
                </DialogContent>
              </Dialog>
              <Link to="/register" className="text-sm text-blue-600 hover:underline font-medium">
                Neu hier? Registrieren
              </Link>
            </div>
            <Button type="submit" className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg transition-all duration-300" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Anmelden'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-gray-200 select-none text-sm">
        © 2024 Stota Transport. Alle Rechte vorbehalten.
      </p>
    </div>
  );
};

export default Login;