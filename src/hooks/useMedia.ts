import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MediaItem {
  id: string;
  type: string;
  url: string;
  title: string;
  created_at: string;
}

interface UseMediaOptions {
  title?: string; // Fetch a specific media item by title
  type?: string;  // Filter by type (e.g., 'image', 'video')
}

export function useMedia(options: UseMediaOptions = {}) {
  const [mediaData, setMediaData] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryKey = useMemo(() => JSON.stringify(options), [options]);

  useEffect(() => {
    const fetchMediaItems = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from('media').select('*');

        if (options.title) {
          query = query.eq('title', options.title);
        }
        if (options.type) {
          query = query.eq('type', options.type);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setMediaData(data as MediaItem[]);
      } catch (err: any) {
        console.error('Error fetching media:', err.message);
        setError(err.message);
        toast.error('Fehler beim Laden der Medien: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaItems();

    // Setup real-time subscription for relevant changes
    const channel = supabase
      .channel(`public:media:${queryKey}`) // Unique channel name based on query
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media' }, (payload) => {
        // Re-fetch data on any change to the media table
        fetchMediaItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryKey]); // Re-run effect if options change

  // Return single item if title was requested, otherwise array
  const resultMedia = useMemo(() => {
    if (options.title) {
      return mediaData?.[0] || null; // Return the first item if title was specified
    }
    return mediaData; // Return array otherwise
  }, [mediaData, options.title]);

  return { media: resultMedia, loading, error };
}