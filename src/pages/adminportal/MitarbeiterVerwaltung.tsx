import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MitarbeiterVerwaltung = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const createMitarbeiter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mitarbeiter in Auth-Tabelle erstellen
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      toast.error('Fehler beim Erstellen: ' + authError.message);
      setLoading(false);
      return;
    }

    // Mitarbeiter in Profil-Tabelle eintragen
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authData.user?.id,
          email,
          role: 'mitarbeiter'
        }
      ]);

    if (profileError) {
      toast.error('Profil konnte nicht erstellt werden');
      await supabase.auth.admin.deleteUser(authData.user?.id || '');
    } else {
      toast.success('Mitarbeiter erfolgreich erstellt');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mitarbeiterverwaltung</h2>
      
      <form onSubmit={createMitarbeiter} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">E-Mail</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passwort</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Wird erstellt...' : 'Mitarbeiter anlegen'}
        </Button>
      </form>
    </div>
  );
};

export default MitarbeiterVerwaltung;