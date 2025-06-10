import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Image, Video, Upload, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  alt_text?: string;
  is_editing?: boolean;
  temp_title?: string;
  temp_alt_text?: string;
}

export default function MediaManager() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newMedia, setNewMedia] = useState({
    type: 'image' as 'image' | 'video',
    title: '',
    file: null as File | null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMedia(data?.map(item => ({
        ...item,
        is_editing: false,
        temp_title: item.title,
        temp_alt_text: item.alt_text
      })) || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Medien');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMedia(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };

  const uploadMedia = async () => {
    if (!newMedia.file) {
      toast.error('Bitte wählen Sie eine Datei aus');
      return;
    }

    setUploading(true);
    try {
      const fileExt = newMedia.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${newMedia.type}s/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, newMedia.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          type: newMedia.type,
          url: publicUrl,
          title: newMedia.title,
          alt_text: ''
        });

      if (dbError) throw dbError;

      toast.success('Medium erfolgreich hochgeladen');
      setNewMedia({
        type: 'image',
        title: '',
        file: null
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchMedia();
    } catch (error) {
      toast.error('Fehler beim Hochladen des Mediums');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: string, url: string) => {
    if (!window.confirm('Möchten Sie dieses Medium wirklich löschen?')) return;
    
    try {
      // Extract path from URL
      const path = url.split('/media/')[1];
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
      
      toast.success('Medium erfolgreich gelöscht');
      fetchMedia();
    } catch (error) {
      toast.error('Fehler beim Löschen des Mediums');
      console.error(error);
    }
  };

  const startEditing = (id: string) => {
    setMedia(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            is_editing: true,
            temp_title: item.title,
            temp_alt_text: item.alt_text
          } 
        : item
    ));
  };

  const cancelEditing = (id: string) => {
    setMedia(prev => prev.map(item => 
      item.id === id 
        ? { ...item, is_editing: false } 
        : item
    ));
  };

  const saveChanges = async (id: string) => {
    const item = media.find(m => m.id === id);
    if (!item) return;

    try {
      const { error } = await supabase
        .from('media')
        .update({
          title: item.temp_title,
          alt_text: item.temp_alt_text
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Änderungen gespeichert');
      setMedia(prev => prev.map(m => 
        m.id === id 
          ? { 
              ...m, 
              title: m.temp_title || '',
              alt_text: m.temp_alt_text,
              is_editing: false 
            } 
          : m
      ));
    } catch (error) {
      toast.error('Fehler beim Speichern der Änderungen');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medien-Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <Label>Medientyp</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newMedia.type}
                onChange={(e) => setNewMedia(prev => ({
                  ...prev,
                  type: e.target.value as 'image' | 'video'
                }))}
              >
                <option value="image">Bild</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Titel</Label>
              <Input
                value={newMedia.title}
                onChange={(e) => setNewMedia(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
                placeholder="Medientitel"
              />
            </div>

            <div className="space-y-2">
              <Label>Datei</Label>
              <Input
                type="file"
                ref={fileInputRef}
                accept={newMedia.type === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <Button 
            onClick={uploadMedia}
            disabled={!newMedia.file || uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Hochladen...' : 'Medium hochladen'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medienbibliothek</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vorschau</TableHead>
                <TableHead>Titel</TableHead>
                <TableHead>Alt-Text</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {media.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.type === 'image' ? (
                      <img 
                        src={item.url} 
                        alt={item.alt_text || ''} 
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded">
                        <Video className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {item.is_editing ? (
                      <Input
                        value={item.temp_title || ''}
                        onChange={(e) => setMedia(prev => prev.map(m => 
                          m.id === item.id 
                            ? { ...m, temp_title: e.target.value } 
                            : m
                        ))}
                      />
                    ) : (
                      item.title
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {item.is_editing ? (
                      <Input
                        value={item.temp_alt_text || ''}
                        onChange={(e) => setMedia(prev => prev.map(m => 
                          m.id === item.id 
                            ? { ...m, temp_alt_text: e.target.value } 
                            : m
                        ))}
                      />
                    ) : (
                      item.alt_text || '-'
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={item.type === 'image' ? 'default' : 'secondary'}>
                      {item.type === 'image' ? 'Bild' : 'Video'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right space-x-2">
                    {item.is_editing ? (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => cancelEditing(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => saveChanges(item.id)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => startEditing(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteMedia(item.id, item.url)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}