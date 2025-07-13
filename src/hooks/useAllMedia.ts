import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!supabase) {
      setError('Supabase client not initialized.');
      setLoading(false);
      return;
    }

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
        .subscribe();
    } catch (e: any) {
      console.error("Error subscribing to Supabase channel in useAllMedia:", e);
      setError(e.message || 'Failed to subscribe to real-time updates.');
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return { media, loading, error, mutate: fetchAllMedia };
};