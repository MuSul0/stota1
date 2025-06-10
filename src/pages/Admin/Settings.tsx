import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: 'Nikolai Transport',
    contactEmail: 'info@nikolai-transport.de',
    phoneNumber: '+49 123 456 789',
    maintenanceMode: false
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Hier würden die Einstellungen in der Datenbank gespeichert werden
      toast.success('Einstellungen erfolgreich gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Einstellungen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Einstellungen</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Allgemeine Einstellungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Firmenname</Label>
            <Input 
              id="companyName" 
              value={settings.companyName} 
              onChange={(e) => setSettings({...settings, companyName: e.target.value})} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Kontakt-E-Mail</Label>
            <Input 
              id="contactEmail" 
              value={settings.contactEmail} 
              onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Telefonnummer</Label>
            <Input 
              id="phoneNumber" 
              value={settings.phoneNumber} 
              onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})} 
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <input
              type="checkbox"
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
              className="h-4 w-4"
            />
            <Label htmlFor="maintenanceMode">Wartungsmodus</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Speichern...' : 'Einstellungen speichern'}
        </Button>
      </div>
    </div>
  );
}