import { useState, useEffect, useCallback } from 'react';
import supabase from '@/integrations/supabase/client';

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: string;
  page_context?: string | null;
  description?: string | null;
  created_at: string;
}

interface UseMediaProps {
  title?: string;
  type?: string;
  id?: string;
  pageContext?: string;
}

export const useMedia = (props?: UseMediaProps) => {
  const [media, setMedia] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id, title, type, pageContext } = props || {};

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from('media').select('*');

      if (id) {
        query = query.eq('id', id);
      }
      if (title) {
        query = query.ilike('title', `%${title}%`);
      }
      if (type) {
        query = query.eq('type', type);
      }
      if (pageContext) {
        query = query.eq('page_context', pageContext);
      }

      const { data, error: queryError } = await query.order('created_at', { ascending: false });

      if (queryError) {
        throw queryError;
      }
      setMedia(data as MediaItem[]);
    } catch (err: any) {
      setError(err.message || 'Ein unbekannter Fehler ist aufgetreten.');
      setMedia(null);
    } finally {
      setLoading(false);
    }
  }, [id, title, type, pageContext]);

  useEffect(() => {
    fetchMedia();
    // Optional: Echtzeit-Updates für Medien
    // (Könnte hier ein Supabase-Subscription-Setup erfolgen, falls gewünscht)
  }, [fetchMedia]);

  return { media, loading, error, mutate: fetchMedia };
};