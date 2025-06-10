import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: 'Nikolai Transport',
    contactEmail: 'info@nikolai-transport.de',
    phoneNumber: '+49 123 456 789',
    address: 'Musterstraße 123, 12345 Musterstadt',
    maintenanceMode: false,
    analyticsEnabled: true,
    darkMode: false,
    defaultLanguage: 'de',
    timezone: 'Europe/Berlin',
    currency: 'EUR'
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Hier würden die Einstellungen in der Datenbank gespeichert werden
      const { error } = await supabase
        .from('settings')
        .upsert({
          id: 1,
          ...settings
        }, {
          onConflict: 'id'
        });

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
    const { id, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Einstellungen</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Allgemein</TabsTrigger>
          <TabsTrigger value="appearance">Darstellung</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
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
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Kontakt-E-Mail</Label>
                <Input 
                  id="contactEmail" 
                  value={settings.contactEmail} 
                  onChange={handleInputChange} 
                  type="email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Telefonnummer</Label>
                <Input 
                  id="phoneNumber" 
                  value={settings.phoneNumber} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input 
                  id="address" 
                  value={settings.address} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Checkbox
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    maintenanceMode: !!checked
                  }))}
                />
                <Label htmlFor="maintenanceMode">Wartungsmodus aktivieren</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Darstellung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    darkMode: !!checked
                  }))}
                />
                <Label htmlFor="darkMode">Dark Mode aktivieren</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Standardsprache</Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={(value) => handleSelectChange('defaultLanguage', value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sprache wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="en">Englisch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analyticsEnabled"
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    analyticsEnabled: !!checked
                  }))}
                />
                <Label htmlFor="analyticsEnabled">Analytics aktivieren</Label>
              </div>

              <div className="space-y-2">
                <Label>E-Mail-Benachrichtigungen</Label>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emailNewBookings" />
                    <Label htmlFor="emailNewBookings">Neue Buchungen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emailCancellations" />
                    <Label htmlFor="emailCancellations">Stornierungen</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Systemeinstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Zeitzone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => handleSelectChange('timezone', value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Zeitzone wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Berlin">Berlin (GMT+1)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Standardwährung</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => handleSelectChange('currency', value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Währung wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="USD">US-Dollar ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Speichern...' : 'Einstellungen speichern'}
        </Button>
      </div>
    </div>
  );
}