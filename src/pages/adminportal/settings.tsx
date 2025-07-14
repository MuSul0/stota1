import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SmartMediaUpload } from '@/components/admin/SmartMediaUpload';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    company_name: '',
    contact_email: '',
    phone_number: '',
    address: '',
    maintenance_mode: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (error && error.code === 'PGRST116') {
        // No settings row found, create one with defaults
        const { data: initialData, error: insertError } = await supabase
          .from('settings')
          .insert({ id: 1 })
          .select()
          .single();
        if (insertError) throw insertError;
        setSettings(initialData);
        toast.info('Standardeinstellungen wurden initialisiert.');
      } else if (error) {
        throw error;
      } else if (data) {
        setSettings(data);
      }
    } catch (error) {
      toast.error('Fehler beim Laden der Einstellungen.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ ...settings, id: 1 }, { onConflict: 'id' });
      if (error) throw error;
      toast.success('Einstellungen erfolgreich gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Einstellungen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSettings(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [id]: checked }));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl space-y-6">
      <h1 className="text-3xl font-bold text-white">Einstellungen</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">Allgemein</TabsTrigger>
          <TabsTrigger value="media">Medien</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader><CardTitle>Allgemeine Firmendaten</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company_name">Firmenname</Label>
                  <Input id="company_name" value={settings.company_name} onChange={handleInputChange} className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <Label htmlFor="contact_email">Kontakt E-Mail</Label>
                  <Input id="contact_email" type="email" value={settings.contact_email} onChange={handleInputChange} className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <Label htmlFor="phone_number">Telefonnummer</Label>
                  <Input id="phone_number" value={settings.phone_number} onChange={handleInputChange} className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" value={settings.address} onChange={handleInputChange} className="bg-gray-700 border-gray-600" />
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Checkbox id="maintenance_mode" checked={settings.maintenance_mode} onCheckedChange={(checked) => handleCheckboxChange('maintenance_mode', !!checked)} />
                <Label htmlFor="maintenance_mode">Wartungsmodus aktivieren</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader><CardTitle>Globale Medien</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <SmartMediaUpload
                title="Firmenlogo"
                description="Das Logo, das auf der gesamten Website verwendet wird (z.B. im Header und Footer)."
                type="image"
                pageContext="global"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Einstellungen speichern
        </Button>
      </div>
    </main>
  );
}