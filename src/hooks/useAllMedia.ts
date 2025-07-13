import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

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
    setLoading(true);
    setError(null);
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized.');
      }
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
  }, []); // fetchAllMedia only depends on stable setters

  useEffect(() => {
    if (!supabase) {
      setError('Supabase client not initialized.');
      setLoading(false);
      return;
    }

    fetchAllMedia(); // Initial fetch

    let channel: RealtimeChannel | null = null;
    try {
      channel = supabase
        .channel('media-all-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'media' },
          () => {
            fetchAllMedia(); // Re-fetch on change
          }
        )
        .subscribe((status, err) => {
          if (err) {
            console.error("Error subscribing to Supabase channel in useAllMedia:", err);
            setError(err.message || 'Failed to subscribe to real-time updates.');
          }
        });
    } catch (e: any) {
      console.error("Fehler beim Abonnieren des Supabase-Kanals in useAllMedia:", e);
      setError(e.message || 'Fehler beim Abonnieren von Echtzeit-Updates.');
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [fetchAllMedia]); // Effect depends on fetchAllMedia

  return { media, loading, error, mutate: fetchAllMedia };
};