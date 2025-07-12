import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useMedia } from '@/hooks/useMedia';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, Video, Image as ImageIcon, Loader2 } from 'lucide-react';

interface MediaUploadSlotProps {
  title: string;
  description: string;
  pageContext: string;
  type: 'image' | 'video';
}

export const MediaUploadSlot = ({ title, description, pageContext, type }: MediaUploadSlotProps) => {
  const { media, loading: mediaLoading, error, mutate } = useMedia({ title });
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // 1. Upload file to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${type}s/${title.replace(/\s+/g, '_')}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // 3. Upsert into media table
      const { error: dbError } = await supabase
        .from('media')
        .upsert({
          title: title,
          url: publicUrl,
          type: type,
          page_context: pageContext,
          description: description,
        }, { onConflict: 'title' });

      if (dbError) throw dbError;

      toast.success(`"${title}" erfolgreich aktualisiert.`);
      setFile(null);
      mutate(); // Re-fetch the media data
    } catch (error: any) {
      toast.error(`Fehler beim Hochladen: ${error.message}`);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-gray-600 rounded-lg p-4 flex flex-col md:flex-row items-start gap-4">
      <div className="flex-shrink-0 w-full md:w-48 h-32 bg-gray-800 rounded-md flex items-center justify-center">
        {mediaLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        ) : media?.url ? (
          type === 'image' ? (
            <img src={media.url} alt={title} className="w-full h-full object-cover rounded-md" />
          ) : (
            <video src={media.url} className="w-full h-full object-cover rounded-md" controls />
          )
        ) : (
          <div className="text-center text-gray-500">
            {type === 'image' ? <ImageIcon className="h-8 w-8 mx-auto" /> : <Video className="h-8 w-8 mx-auto" />}
            <p className="text-sm mt-1">Kein Medium</p>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            id={`file-upload-${title}`}
            className="hidden"
            accept={type === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button asChild variant="outline" size="sm">
            <label htmlFor={`file-upload-${title}`}>Datei auswählen</label>
          </Button>
          <Button onClick={handleUpload} disabled={!file || uploading} size="sm">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            <span className="ml-2">{uploading ? 'Hochladen...' : 'Hochladen'}</span>
          </Button>
        </div>
        {file && <p className="text-xs text-gray-300 mt-2">Ausgewählt: {file.name}</p>}
      </div>
    </div>
  );
};