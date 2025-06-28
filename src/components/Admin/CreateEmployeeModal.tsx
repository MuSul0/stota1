import { useState } from 'react';
import { supabaseAdmin } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function CreateEmployeeModal({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'mitarbeiter'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Benutzer erstellen
      const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(formData.email, {
        redirectTo: `${window.location.origin}/set-password`
      });

      if (error) throw error;

      // 2. Profil in der Datenbank anlegen
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.name,
          role: formData.role
        });

      if (profileError) throw profileError;

      toast.success(`Mitarbeiter ${formData.name} wurde eingeladen`);
      onOpenChange(false);
      setFormData({ name: '', email: '', role: 'mitarbeiter' });
    } catch (error) {
      toast.error('Fehler beim Erstellen des Mitarbeiters');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuen Mitarbeiter erstellen</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Vollständiger Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Max Mustermann"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="max@nikolai-transport.de"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Rolle</Label>
            <select
              id="role"
              className="w-full border rounded-md p-2"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="mitarbeiter">Mitarbeiter</option>
              <option value="teamleiter">Teamleiter</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Wird erstellt...' : 'Mitarbeiter einladen'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}