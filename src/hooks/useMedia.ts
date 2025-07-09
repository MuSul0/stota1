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

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

interface UseMediaOptions {
  title?: string; // Fetch a specific media item by title
  type?: string;  // Filter by type (e.g., 'image', 'video', 'service')
  fetchAll?: boolean; // Fetch all media items regardless of type
}

export function useMedia(options: UseMediaOptions = {}) {
  const [data, setData] = useState<MediaItem[] | ServiceItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryKey = useMemo(() => JSON.stringify(options), [options]);

  useEffect(() => {
    const fetchDataItems = async () => {
      setLoading(true);
      setError(null);
      try {
        let query;
        let tableName = 'media'; // Default table

        if (options.type === 'service') {
          tableName = 'services';
          query = supabase.from(tableName).select('*').eq('is_active', true).order('title', { ascending: true });
        } else {
          query = supabase.from(tableName).select('*');
          if (options.title) {
            query = query.eq('title', options.title);
          }
          if (options.type) {
            query = query.eq('type', options.type);
          }
        }

        const { data: fetchedData, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setData(fetchedData as MediaItem[] | ServiceItem[]);
      } catch (err: any) {
        console.error(`Error fetching ${options.type || 'media'}:`, err.message);
        setError(err.message);
        toast.error(`Fehler beim Laden der ${options.type || 'Medien'}: ` + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataItems();

    // Setup real-time subscription for relevant changes
    const channel = supabase
      .channel(`public:${options.type || 'media'}:${queryKey}`) // Unique channel name based on query
      .on('postgres_changes', { event: '*', schema: 'public', table: options.type === 'service' ? 'services' : 'media' }, (payload) => {
        // Re-fetch data on any change to the relevant table
        fetchDataItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryKey, options.type]); // Re-run effect if options or type change

  // Return single item if title was requested and not a service, otherwise array
  const resultData = useMemo(() => {
    if (options.title && options.type !== 'service') {
      return (data as MediaItem[])?.[0] || null; // Return the first item if title was specified and it's media
    }
    return data; // Return array otherwise
  }, [data, options.title, options.type]);

  return { media: resultData, loading, error };
}