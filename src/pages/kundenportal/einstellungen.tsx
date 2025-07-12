import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Einstellungen() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!session || !['kunde', 'user'].includes(user?.role || '')) {
        navigate('/login');
      } else {
        setEmail(user.email || '');
        fetchPhone();
      }
    }
  }, [session, user, loading, navigate]);

  const fetchPhone = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('phone')
      .eq('id', user.id)
      .single();

    if (error) {
      toast.error('Fehler beim Laden der Telefonnummer');
      console.error(error);
    } else {
      setPhone(data?.phone || '');
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Benutzer nicht gefunden');
      return;
    }
    setSaving(true);

    try {
      // E-Mail im Auth-User aktualisieren
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email });
        if (emailError) {
          toast.error('Fehler beim Aktualisieren der E-Mail');
          setSaving(false);
          return;
        }
      }

      // Telefonnummer in profiles speichern
      const { error: phoneError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, phone }, { onConflict: 'id' });

      if (phoneError) {
        toast.error('Fehler beim Speichern der Telefonnummer');
        setSaving(false);
        return;
      }

      toast.success('Einstellungen erfolgreich gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Einstellungen');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Einstellungen...</p>
      </div>
    );
  }

  if (!session || !['kunde', 'user'].includes(user?.role || '')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Kunde anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Kontoeinstellungen</h1>
        <p className="mb-8 text-gray-700">Verwalten Sie Ihre Kontaktdaten und Präferenzen.</p>

        <Card>
          <CardHeader>
            <CardTitle>Persönliche Daten</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="z.B. +49 123 456 789"
                />
              </div>

              <Button type="submit" disabled={saving} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                {saving ? 'Speichern...' : 'Einstellungen speichern'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}