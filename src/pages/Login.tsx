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
import PasswordReset from '@/components/PasswordReset';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo className="mx-auto w-32 h-32" />
          <CardTitle>Anmelden</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>E-Mail</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Passwort</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Anmelden'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;