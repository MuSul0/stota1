import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import PasswordReset from '@/components/PasswordReset';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await handlePostLoginNavigation(session.user.id);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handlePostLoginNavigation = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;

      switch (profile.role) {
        case 'kunde':
          navigate('/kundenportal', { replace: true });
          break;
        case 'mitarbeiter':
          navigate('/mitarbeiterportal', { replace: true });
          break;
        case 'admin':
          navigate('/adminportal', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    } catch (error) {
      toast.error('Fehler beim Laden der Benutzerdaten');
      await supabase.auth.signOut();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Navigation wird durch onAuthStateChange gehandelt
    } catch (error) {
      toast.error('Anmeldung fehlgeschlagen: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Logo className="mx-auto w-32 h-32" />
          <CardTitle className="text-2xl">Anmelden</CardTitle>
          <CardDescription className="text-gray-600">
            Melden Sie sich mit Ihrer E-Mail und Ihrem Passwort an.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
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
                placeholder="Ihr Passwort"
                required
                autoComplete="current-password"
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
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Anmelden'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;