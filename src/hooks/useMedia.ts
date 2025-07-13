import { useMediaContext } from '@/contexts/MediaContext';
import { useMemo } from 'react';

// Helper function to generate the unique database title, must match the one in MediaUploadSlot
const getUniqueDbTitle = (displayTitle: string, pageContext: string, mediaType: 'image' | 'video') => {
  const sanitize = (name: string | null | undefined) => { // Erlaube null/undefined als Eingabe
    const safeName = typeof name === 'string' ? name : ''; // Stelle sicher, dass es eine Zeichenkette ist
    return safeName
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const sanitizedPageContext = sanitize(pageContext);
  const sanitizedDisplayTitle = sanitize(displayTitle);
  return `${sanitizedPageContext}-${sanitizedDisplayTitle}-${mediaType}`;
};

/**
 * A hook to get a specific media item from the global media context.
 * It's fast, efficient, and provides real-time updates.
 *
 * @param pageContext The context of the page where the media is used (e.g., 'Startseite').
 * @param title The display title of the media (e.g., 'Hero Background').
 * @param type The type of media, 'image' or 'video'. Defaults to 'image'.
 * @returns An object containing the media item's URL, the loading state, and the full media item object.
 */
export const useMedia = (pageContext: string, title: string, type: 'image' | 'video' = 'image') => {
  const { media, loading } = useMediaContext();

  const mediaItem = useMemo(() => {
    if (loading || !media) {
      return null;
    }
    const expectedDbTitle = getUniqueDbTitle(title, pageContext, type);
    return media.find(item => item.title === expectedDbTitle);
  }, [media, loading, pageContext, title, type]);

  return {
    url: mediaItem?.url || null,
    loading,
    item: mediaItem,
  };
};