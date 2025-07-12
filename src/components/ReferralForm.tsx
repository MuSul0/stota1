import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

export const ReferralForm = () => {
  const [formData, setFormData] = useState({
    referrer_name: '',
    referrer_email: '',
    referred_name: '',
    referred_email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.referred_name || !formData.referred_email) {
      toast.error('Bitte füllen Sie die Pflichtfelder für den Kontakt aus.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('referrals').insert({
        referrer_name: formData.referrer_name || 'Anonym',
        referrer_email: formData.referrer_email || null,
        referred_name: formData.referred_name,
        referred_email: formData.referred_email,
        message: formData.message || null,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Vielen Dank für Ihre Empfehlung!', {
        description: 'Wir werden uns umgehend mit Ihrem Kontakt in Verbindung setzen.',
      });
      setFormData({
        referrer_name: '',
        referrer_email: '',
        referred_name: '',
        referred_email: '',
        message: '',
      });
    } catch (error) {
      toast.error('Fehler beim Senden der Empfehlung.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Jetzt weiterempfehlen</CardTitle>
        <CardDescription>
          Geben Sie die Daten Ihres Kontakts ein. Wir kümmern uns um den Rest.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referrer_name">Dein Name (optional)</Label>
              <Input
                id="referrer_name"
                value={formData.referrer_name}
                onChange={(e) => handleInputChange('referrer_name', e.target.value)}
                placeholder="Max Mustermann"
              />
            </div>
            <div>
              <Label htmlFor="referrer_email">Deine E-Mail (optional)</Label>
              <Input
                id="referrer_email"
                type="email"
                value={formData.referrer_email}
                onChange={(e) => handleInputChange('referrer_email', e.target.value)}
                placeholder="deine.email@example.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referred_name">Name deines Kontakts *</Label>
              <Input
                id="referred_name"
                value={formData.referred_name}
                onChange={(e) => handleInputChange('referred_name', e.target.value)}
                required
                placeholder="Erika Musterfrau"
              />
            </div>
            <div>
              <Label htmlFor="referred_email">E-Mail-Adresse *</Label>
              <Input
                id="referred_email"
                type="email"
                value={formData.referred_email}
                onChange={(e) => handleInputChange('referred_email', e.target.value)}
                required
                placeholder="kontakt.email@example.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Persönliche Nachricht (optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Eine kurze Nachricht an deinen Kontakt..."
              rows={4}
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Wird gesendet...' : 'Empfehlung absenden'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};