import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSetPassword = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) throw error;

      toast.success('Passwort erfolgreich gesetzt!');
      window.location.href = '/mitarbeiterportal';
    } catch (error) {
      toast.error('Fehler beim Setzen des Passworts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4">
        <h1 className="text-2xl font-bold">Passwort festlegen</h1>
        <div className="grid gap-2">
          <Label htmlFor="password">Neues Passwort</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSetPassword} disabled={loading}>
          {loading ? 'Wird gespeichert...' : 'Passwort speichern'}
        </Button>
      </div>
    </div>
  );
}