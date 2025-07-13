import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Trash2, FileImage, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAllMedia } from '@/hooks/useAllMedia';

interface MediaUploadSlotProps {
  title: string;
  description: string;
  type: 'image' | 'video';
  pageContext: string;
}

export const MediaUploadSlot: React.FC<MediaUploadSlotProps> = ({ title, description, type, pageContext }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<{ url: string; id: string } | null>(null);

  const { media: allMediaItems, mutate: refetchAllMedia } = useAllMedia();

  useEffect(() => {
    const mediaItem = allMediaItems.find(
      (item) => item.title === title && item.page_context === pageContext && item.type === type
    );
    if (mediaItem) {
      setCurrentMedia({ url: mediaItem.url, id: mediaItem.id });
    } else {
      setCurrentMedia(null);
    }
  }, [allMediaItems, title, pageContext, type]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const sanitizeFilename = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('Bitte wählen Sie eine Datei zum Hochladen aus.');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const sanitizedTitle = sanitizeFilename(title);
      const sanitizedPageContext = sanitizeFilename(pageContext);
      const fileName = `${sanitizedPageContext}-${sanitizedTitle}-${Date.now()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      // 1. Upload new file to storage
      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);

      // 2. Update or Insert record in database
      if (currentMedia) {
        // If media already exists for this slot, update it
        const { error: dbUpdateError } = await supabase
          .from('media')
          .update({ url: publicUrl, created_at: new Date().toISOString() }) // Update URL and timestamp
          .eq('id', currentMedia.id); // Identify by ID
        if (dbUpdateError) throw dbUpdateError;

        // 3. Delete old file from storage (after successful DB update)
        const oldFilePath = currentMedia.url.split('/media/')[1];
        if (oldFilePath) {
          const { error: storageDeleteError } = await supabase.storage.from('media').remove([oldFilePath]);
          if (storageDeleteError) {
            console.warn('Error deleting old file from storage:', storageDeleteError);
            // Log warning but don't block the main operation
          }
        }
      } else {
        // If no media exists for this slot, insert a new one
        const { error: dbInsertError } = await supabase.from('media').insert({
          type: type,
          url: publicUrl,
          title: title,
          description: description,
          page_context: pageContext,
        });
        if (dbInsertError) throw dbInsertError;
      }

      toast.success('Medium erfolgreich hochgeladen und aktualisiert!');
      setFile(null);
      refetchAllMedia();
    } catch (error: any) {
      toast.error('Fehler beim Hochladen: ' + error.message);
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async () => {
    if (!currentMedia || !window.confirm('Sind Sie sicher, dass Sie dieses Medium löschen möchten?')) {
      return;
    }

    try {
      // Delete from storage
      const filePath = currentMedia.url.split('/media/')[1];
      if (filePath) {
        const { error: storageError } = await supabase.storage.from('media').remove([filePath]);
        if (storageError) throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase.from('media').delete().eq('id', currentMedia.id);
      if (dbError) throw dbError;

      toast.success('Medium erfolgreich gelöscht!');
      setCurrentMedia(null);
      refetchAllMedia(); // Refresh media list
    } catch (error: any) {
      toast.error('Fehler beim Löschen: ' + error.message);
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg bg-gray-700">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
      <div className="flex-grow flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="flex-grow w-full">
          <Label htmlFor={`file-upload-${title}`} className="sr-only">Datei auswählen</Label>
          <Input
            id={`file-upload-${title}`}
            type="file"
            accept={type === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            className="bg-gray-600 text-white placeholder-gray-400 border-gray-500"
          />
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            onClick={handleFileUpload}
            disabled={uploading || !file}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Lädt hoch...' : 'Hochladen'}
          </Button>
          {currentMedia && (
            <Button
              onClick={handleDeleteMedia}
              variant="destructive"
              disabled={uploading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {currentMedia && (
        <div className="flex-shrink-0 w-full md:w-1/4 flex items-center justify-center p-2 border border-gray-600 rounded-md bg-gray-800">
          {type === 'image' ? (
            <img src={currentMedia.url} alt={title} className="max-h-24 object-contain rounded" />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <Video className="h-12 w-12" />
              <span className="text-xs mt-1">Video vorhanden</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};