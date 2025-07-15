import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  id: string;
  title: string; // Descriptive title, e.g., "Startseite Hero Background"
  url: string;
  type: string;
  page_context: string | null; // e.g., "startseite"
  created_at: string;
}

interface UseMediaProps {
  title?: string; // The descriptive title
  type?: string;
  id?: string;
  pageContext?: string; // The section ID
}

export const useMedia = (props?: UseMediaProps) => {
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id, title, type, pageContext } = props || {};
  const subscriptionRef = useRef<any>(null);

  const fetchMedia = useCallback(async () => {
    if (!id && (!title || !pageContext) && !type) {
      setMedia(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const fetchPromise = (async () => {
        if (!supabase) {
          throw new Error('Supabase client is not initialized.');
        }
        let query = supabase.from('media').select('*');

        if (id) {
          query = query.eq('id', id);
        } else if (title && pageContext) {
          query = query.eq('title', title).eq('page_context', pageContext);
        } else if (type) {
          query = query.eq('type', type);
        } else {
          return null;
        }

        const { data, error: queryError } = await query.single();

        if (queryError) {
          if (queryError.code === 'PGRST116') { // No rows found for single()
            return null;
          } else {
            throw queryError;
          }
        }
        return data;
      })();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Datenabfrage hat zu lange gedauert (Timeout).')), 10000)
      );

      const result = await Promise.race([fetchPromise, timeoutPromise]);
      setMedia(result as MediaItem | null);

    } catch (err: any) {
      console.error("Fehler beim Laden der Medien:", err);
      setError(err.message || 'Ein unbekannter Fehler ist aufgetreten.');
      setMedia(null);
    } finally {
      setLoading(false);
    }
  }, [id, title, type, pageContext]);

  useEffect(() => {
    fetchMedia();

    // Setup real-time subscription
    if (title && pageContext) {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }

      const channel = supabase
        .channel(`media_channel_${pageContext}_${title.replace(/\s/g, '_')}`) // Unique channel name
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'media',
          filter: `page_context=eq.${pageContext}` // Filter by page_context
        }, (payload) => {
          // Check if the changed item matches the specific title
          if (payload.new?.title === title || payload.old?.title === title) {
            console.log('Real-time update for media:', payload);
            fetchMedia(); // Re-fetch the media item
          }
        })
        .subscribe();

      subscriptionRef.current = channel;

      return () => {
        if (subscriptionRef.current) {
          supabase.removeChannel(subscriptionRef.current);
          subscriptionRef.current = null;
        }
      };
    }
  }, [fetchMedia, title, pageContext]);

  return { media, loading, error, mutate: fetchMedia };
};