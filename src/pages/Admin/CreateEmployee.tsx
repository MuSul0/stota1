import { useState } from 'react';
import { supabaseAdmin } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateEmployee() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = async () => {
    setLoading(true);
    try {
      // 1. Benutzer erstellen
      const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${window.location.origin}/set-password`
      });

      if (error) throw error;

      // 2. Profil in der Datenbank anlegen
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email,
          role: 'employee'
        });

      if (profileError) throw profileError;

      toast.success(`Einladung an ${email} gesendet`);
      setEmail('');
    } catch (error) {
      toast.error('Fehler beim Erstellen des Mitarbeiters');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mitarbeiter einladen</h2>
      <div className="grid gap-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mitarbeiter@beispiel.de"
        />
      </div>
      <Button onClick={handleCreateEmployee} disabled={loading}>
        {loading ? 'Wird erstellt...' : 'Mitarbeiter einladen'}
      </Button>
    </div>
  );
}