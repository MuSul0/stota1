import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Upload, Video } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: 'Stota Transport',
    contactEmail: 'kontakt@info-stota.de',
    phoneNumber: '+49 123 456 789',
    address: 'Musterstraße 123, 12345 Musterstadt',
    maintenanceMode: false,
    analyticsEnabled: true,
    darkMode: false,
    defaultLanguage: 'de',
    timezone: 'Europe/Berlin',
    currency: 'EUR'
  });

  const [media, setMedia] = useState<{
    images: Array<{ id: string; url: string; title: string }>;
    videos: Array<{ id: string; url: string; title: string }>;
  }>({ images: [], videos: [] });
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newMedia, setNewMedia] = useState({
    type: 'image',
    title: '',
    file: null as File | null
  });

  useEffect(() => {
    fetchSettings();
    fetchMedia();
  }, []);

  const fetchSettings = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error && error.code === 'PGRST116') { // No rows found
        // Insert default settings if no row exists
        const { error: insertError } = await supabase
          .from('settings')
          .insert({
            id: 1, // Assuming a single settings row with ID 1
            company_name: settings.companyName,
            contact_email: settings.contactEmail,
            phone_number: settings.phoneNumber,
            address: settings.address,
            maintenance_mode: settings.maintenanceMode,
            analytics_enabled: settings.analyticsEnabled,
            dark_mode: settings.darkMode,
            default_language: settings.defaultLanguage,
            timezone: settings.timezone,
            currency: settings.currency
          });
        if (insertError) throw insertError;
        toast.success('Standardeinstellungen initialisiert');
        fetchSettings(); // Re-fetch after insert
      } else if (error) {
        throw error;
      } else if (data) {
        setSettings({
          companyName: data.company_name || '',
          contactEmail: data.contact_email || '',
          phoneNumber: data.phone_number || '',
          address: data.address || '',
          maintenanceMode: data.maintenance_mode || false,
          analyticsEnabled: data.analytics_enabled || true,
          darkMode: data.dark_mode || false,
          defaultLanguage: data.default_language || 'de',
          timezone: data.timezone || 'Europe/Berlin',
          currency: data.currency || 'EUR'
        });
      }
    } catch (error) {
      toast.error('Fehler beim Laden/Initialisieren der Einstellungen');
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const { data: images } = await supabase
        .from('media')
        .select('*')
        .eq('type', 'image');

      const { data: videos } = await supabase
        .from('media')
        .select('*')
        .eq('type', 'video');

      setMedia({
        images: images || [],
        videos: videos || []
      });
    } catch (error) {
      toast.error('Fehler beim Laden der Medien');
      console.error(error);
    }
  };

  const handleSave = async () => {
    setLoadingData(true);
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          id: 1,
          company_name: settings.companyName,
          contact_email: settings.contactEmail,
          phone_number: settings.phoneNumber,
          address: settings.address,
          maintenance_mode: settings.maintenanceMode,
          analytics_enabled: settings.analyticsEnabled,
          dark_mode: settings.darkMode,
          default_language: settings.defaultLanguage,
          timezone: settings.timezone,
          currency: settings.currency
        }, {
          onConflict: 'id'
        });

      if (error) throw error;
      
      toast.success('Einstellungen erfolgreich gespeichert');
    } catch (error) {
      toast.error('Fehler beim Speichern der Einstellungen');
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleFileUpload = async () => {
    if (!newMedia.file) return;
    
    setUploading(true);
    try {
      const fileExt = newMedia.file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${newMedia.type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, newMedia.file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('media')
        .insert({
          type: newMedia.type,
          url: publicUrl,
          title: newMedia.title
        });

      if (dbError) throw dbError;

      toast.success('Medien erfolgreich hochgeladen');
      setNewMedia({ type: 'image', title: '', file: null });
      fetchMedia();
    } catch (error) {
      toast.error('Fehler beim Hochladen der Medien');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: string) => {
    if (!window.confirm('Möchten Sie dieses Medium wirklich löschen?')) return;
    
    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Medium erfolgreich gelöscht');
      fetchMedia();
    } catch (error) {
      toast.error('Fehler beim Löschen des Mediums');
      console.error(error);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Einstellungen...</p>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl space-y-6">
      <h1 className="text-3xl font-bold">Einstellungen</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Allgemein</TabsTrigger>
          <TabsTrigger value="appearance">Darstellung</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="media">Medien</TabsTrigger>
        </TabsList>
        
        {/* Allgemeine Einstellungen */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Allgemeine Einstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Firmenname</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Kontakt E-Mail</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Telefonnummer</Label>
                  <Input
                    id="phoneNumber"
                    value={settings.phoneNumber}
                    onChange={(e) => setSettings(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Checkbox
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: !!checked }))}
                />
                <Label htmlFor="maintenanceMode">Wartungsmodus aktivieren</Label>
              </div>
              <Button onClick={handleSave} className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Einstellungen speichern
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medienverwaltung */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Medienverwaltung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Neues Medium hochladen</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Select 
                      value={newMedia.type} 
                      onValueChange={(value) => setNewMedia(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Typ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Bild</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input
                      type="file"
                      accept={newMedia.type === 'image' ? 'image/*' : 'video/*'}
                      onChange={(e) => setNewMedia(prev => ({ 
                        ...prev, 
                        file: e.target.files?.[0] || null 
                      }))}
                    />
                    
                    <Button 
                      onClick={handleFileUpload}
                      disabled={!newMedia.file || uploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? 'Hochladen...' : 'Hochladen'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Bilder</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vorschau</TableHead>
                      <TableHead>Titel</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {media.images.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img 
                            src={item.url} 
                            alt={item.title} 
                            className="h-12 w-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="text-sm text-gray-500 truncate max-w-xs">
                          {item.url}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteMedia(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Videos</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vorschau</TableHead>
                      <TableHead>Titel</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {media.videos.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded">
                            <Video className="h-6 w-6 text-gray-400" />
                          </div>
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="text-sm text-gray-500 truncate max-w-xs">
                          {item.url}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteMedia(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loadingData}>
          {loadingData ? 'Speichern...' : 'Einstellungen speichern'}
        </Button>
      </div>
    </main>
  );
}