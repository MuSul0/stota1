import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Upload, Trash2, Eye, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  page_context: string | null;
  description: string | null;
  created_at: string;
}

export const SmartMediaUpload = ({ title, description, type, pageContext, onMediaUpdate, refreshTrigger }: {
  title: string;
  description: string;
  type: 'image' | 'video';
  pageContext: string;
  onMediaUpdate?: () => void;
  refreshTrigger?: number; // Neuer Prop hinzugefügt
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentMedia();
  }, [title, pageContext, refreshTrigger]); // refreshTrigger zu den Abhängigkeiten hinzugefügt

  const loadCurrentMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('page_context', pageContext)
        .ilike('title', `%${title}%`)
        .eq('type', type)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading media:', error);
      } else if (data && data.length > 0) {
        setCurrentMedia(data[0]);
      } else {
        setCurrentMedia(null);
      }
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Bitte wählen Sie eine Datei aus.');
      return;
    }

    setUploading(true);
    try {
      if (currentMedia) {
        await handleDelete(false);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${pageContext}-${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);

      const { data: newMedia, error: dbError } = await supabase.from('media').insert({
        type: type,
        url: publicUrl,
        title: `${pageContext}-${title}`,
        description: description,
        page_context: pageContext,
      }).select().single();

      if (dbError) throw dbError;

      toast.success('Medium erfolgreich hochgeladen!');
      setFile(null);
      setCurrentMedia(newMedia);
      
      if (onMediaUpdate) onMediaUpdate();
    } catch (error: any) {
      toast.error('Fehler beim Hochladen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (showToast = true) => {
    if (!currentMedia) return;

    try {
      const urlParts = currentMedia.url.split('/');
      const fileName = urlParts.slice(urlParts.indexOf(type + 's')).join('/');
      
      await supabase.storage.from('media').remove([fileName]);
      await supabase.from('media').delete().eq('id', currentMedia.id);

      if (showToast) toast.success('Medium erfolgreich gelöscht!');
      setCurrentMedia(null);
      
      if (onMediaUpdate) onMediaUpdate();
    } catch (error: any) {
      if (showToast) toast.error('Fehler beim Löschen: ' + error.message);
    }
  };

  const openMediaInNewTab = () => {
    if (currentMedia) window.open(currentMedia.url, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg bg-gray-700">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
        {currentMedia && (
          <div className="mt-2">
            <Badge variant="outline" className="text-green-400 border-green-400">Aktiv</Badge>
          </div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="flex-grow w-full">
          <Input type="file" accept={type === 'image' ? 'image/*' : 'video/*'} onChange={handleFileChange} className="bg-gray-600 text-white placeholder-gray-400 border-gray-500" />
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button onClick={handleUpload} disabled={uploading || !file} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Lädt hoch...' : currentMedia ? 'Ersetzen' : 'Hochladen'}
          </Button>
          {currentMedia && (
            <Button onClick={() => handleDelete(true)} variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex-shrink-0 w-full md:w-1/4 flex items-center justify-center p-4 border border-gray-600 rounded-md bg-gray-800">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>
      ) : currentMedia ? (
        <div className="flex-shrink-0 w-full md:w-1/4 relative group">
          <div className="flex items-center justify-center p-2 border border-gray-600 rounded-md bg-gray-800">
            {type === 'image' ? (
              <img src={currentMedia.url} alt={title} className="max-h-24 object-contain rounded cursor-pointer" onClick={openMediaInNewTab} />
            ) : (
              <div className="flex flex-col items-center text-gray-400"><Video className="h-8 w-8" /><span className="text-xs mt-1">Video aktiv</span></div>
            )}
          </div>
          <Button onClick={openMediaInNewTab} size="sm" variant="secondary" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="h-3 w-3" /></Button>
        </div>
      ) : (
        <div className="flex-shrink-0 w-full md:w-1/4 flex items-center justify-center p-4 border border-gray-600 rounded-md bg-gray-800">
          <span className="text-gray-400 text-sm">Kein Medium</span>
        </div>
      )}
    </div>
  );
};