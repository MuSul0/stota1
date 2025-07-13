import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js'; // Import RealtimeChannel type

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

  useEffect(() => {
    if (!supabase) {
      setError('Supabase client not initialized.');
      setLoading(false);
      return;
    }

    const fetchMedia = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from('media').select('*');

        if (props?.id) {
          query = query.eq('id', props.id);
        } else if (props?.title) {
          query = query.eq('title', props.title);
        } else if (props?.type) {
          query = query.eq('type', props.type);
        } else {
          // If no specific props are provided, we can't fetch a single item.
          setMedia(null);
          setLoading(false);
          return;
        }

        const { data, error } = await query.single();

        if (error) {
          if (error.code === 'PGRST116' && (props?.title || props?.id)) { // No rows found for single()
            setMedia(null);
          } else {
            throw error;
          }
        } else {
          setMedia(data as MediaItem);
        }
      } catch (err: any) {
        console.error("Fehler beim Laden der Medien:", err);
        setError(err.message || 'Ein unbekannter Fehler ist aufgetreten.');
        setMedia(null); // Ensure media is null on error
      } finally {
        setLoading(false);
      }
    };

    let channel: RealtimeChannel | null = null;
    if (props?.title || props?.type || props?.id) {
      fetchMedia();
      const channelName = `media-single-changes-${props.id || props.title?.replace(/\s/g, '-') || props.type}`;
      
      try {
        channel = supabase
          .channel(channelName)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'media' },
            () => {
              fetchMedia();
            }
          )
          .subscribe();
      } catch (e: any) {
        console.error("Error subscribing to Supabase channel in useMedia:", e);
        setError(e.message || 'Failed to subscribe to real-time updates.');
      }
    } else {
      setLoading(false);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [props?.title, props?.type, props?.id]);

  return { media, loading, error };
};