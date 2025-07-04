import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Video, Upload, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const MediaManager = () => {
  const [media, setMedia] = useState<{
    images: Array<{ id: string; url: string; title: string }>;
    videos: Array<{ id: string; url: string; title: string }>;
  }>({ images: [], videos: [] });
  const [uploading, setUploading] = useState(false);
  const [newMedia, setNewMedia] = useState({
    type: 'image',
    title: '',
    file: null as File | null
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data: images, error: imagesError } = await supabase
        .from('media')
        .select('*')
        .eq('type', 'image');

      const { data: videos, error: videosError } = await supabase
        .from('media')
        .select('*')
        .eq('type', 'video');

      if (imagesError) throw imagesError;
      if (videosError) throw videosError;

      setMedia({
        images: images || [],
        videos: videos || []
      });
    } catch (error) {
      toast.error('Fehler beim Laden der Medien');
      console.error(error);
    }
  };

  const handleFileUpload = async () => {
    if (!newMedia.file) return;
    
    setUploading(true);
    try {
      const fileExt = newMedia.file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medienverwaltung</h1>
      
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
              placeholder="Titel"
              value={newMedia.title}
              onChange={(e) => setNewMedia(prev => ({ ...prev, title: e.target.value }))}
            />
            
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
    </div>
  );
};

export default MediaManager;