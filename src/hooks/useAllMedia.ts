import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  page_context: string | null;
  description: string | null;
  created_at: string;
}

export const useAllMedia = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setMedia(data as MediaItem[]);
    } catch (err: any) {
      console.error("Fehler beim Laden aller Medien:", err);
      setError(err.message || 'Ein unbekannter Fehler ist aufgetreten.');
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMedia();
  }, []);

  return { media, loading, error, mutate: fetchAllMedia };
};