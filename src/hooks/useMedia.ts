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
    if (!id && (!title || !pageContext)) {
      setMedia(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized.');
      }
      let query = supabase.from('media').select('*');

      if (id) {
        query = query.eq('id', id);
      } else if (title && pageContext) {
        const fullTitle = `${pageContext}-${title}`;
        query = query.eq('title', fullTitle).eq('page_context', pageContext);
      } else if (type) {
        query = query.eq('type', type);
      } else {
        setMedia(null);
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await query.order('created_at', { ascending: false }).limit(1).single();

      if (queryError) {
        if (queryError.code === 'PGRST116') { // No rows found for single()
          setMedia(null);
        } else {
          throw queryError;
        }
      } else {
        setMedia(data as MediaItem);
      }
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
      
      const fullTitle = `${pageContext}-${title}`;
      const channel = supabase
        .channel(`media_channel_${pageContext}_${title.replace(/\s/g, '_')}`) // Unique channel name
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'media',
          filter: `page_context=eq.${pageContext}` // Filter by page_context
        }, (payload) => {
          // Check if the changed item matches the specific title
          if (payload.new?.title === fullTitle || payload.old?.title === fullTitle) {
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