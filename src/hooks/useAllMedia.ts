import { useState, useEffect, useCallback } from 'react';
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

  const fetchAllMedia = useCallback(async () => {
    // On initial load, we want to show a loading indicator.
    // For subsequent real-time updates, we don't want to flash the loading state.
    // So we only set loading if it's the first time.
    if (loading) {
      setLoading(true);
    }
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
  }, [loading]); // Dependency on `loading` to correctly handle initial state

  useEffect(() => {
    // Initial fetch
    fetchAllMedia();

    // Set up the real-time subscription
    const channel = supabase
      .channel('public:media')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'media' },
        (payload) => {
          console.log('Media change detected, refetching...', payload);
          // When a change is detected, refetch all media to get the updated list
          fetchAllMedia();
        }
      )
      .subscribe();

    // Cleanup function to remove the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAllMedia]);

  return { media, loading, error, mutate: fetchAllMedia };
};