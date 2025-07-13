import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: string;
  created_at: string;
}

interface UseMediaProps {
  title?: string;
  type?: string;
  id?: string;
}

export const useMedia = (props?: UseMediaProps) => {
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id, title, type } = props || {};

  const fetchMedia = useCallback(async () => {
    if (!id && !title && !type) {
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
      } else if (title) {
        query = query.eq('title', title);
      } else if (type) {
        query = query.eq('type', type);
      }

      const { data, error: queryError } = await query.single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
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
  }, [id, title, type]);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase client not initialized.');
      setLoading(false);
      return;
    }

    fetchMedia();

    if (!id && !title && !type) {
      return;
    }

    const channelName = `media-single-changes-${id || title?.replace(/\s/g, '-') || type}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'media' },
        () => {
          fetchMedia();
        }
      )
      .subscribe((status, err) => {
        if (err) {
          console.error("Error subscribing to Supabase channel in useMedia:", err);
          setError(err.message || 'Failed to subscribe to real-time updates.');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMedia, id, title, type]);

  return { media, loading, error };
};