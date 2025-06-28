import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function EmployeeManagement() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [loading, setLoading] = useState(false);

  const createEmployee = async () => {
    if (!email) {
      toast.error('Bitte eine E-Mail-Adresse eingeben');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
        user_metadata: { role }
      });

      if (error) throw error;

      // Profil in der public.profiles Tabelle erstellen
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: email,
        role: role
      });

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mitarbeiterverwaltung</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Label htmlFor="email">Mitarbeiter-E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mitarbeiter@nikolai-transport.de"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="role">Rolle</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Rolle auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">Mitarbeiter</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={createEmployee} disabled={loading}>
            {loading ? 'Wird erstellt...' : 'Mitarbeiter einladen'}
          </Button>
        </div>
      </div>
    </div>
  );
}