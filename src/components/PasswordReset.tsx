import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const PasswordReset = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Bitte geben Sie Ihre E-Mail-Adresse ein.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login'
    });
    if (error) {
      toast.error('Fehler beim Senden der E-Mail: ' + error.message);
    } else {
      toast.success('E-Mail zum Zurücksetzen des Passworts wurde gesendet.');
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Passwort zurücksetzen</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <Label htmlFor="resetEmail">E-Mail-Adresse</Label>
          <Input
            id="resetEmail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@beispiel.de"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Abbrechen
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Senden...' : 'E-Mail senden'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;