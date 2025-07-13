import React, { createContext, useContext } from 'react';
import { useAllMedia } from '@/hooks/useAllMedia';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  page_context: string | null;
  description: string | null;
  created_at: string;
}

interface MediaContextType {
  media: MediaItem[];
  loading: boolean;
  error: string | null;
  mutate: () => Promise<void>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mediaData = useAllMedia();
  return <MediaContext.Provider value={mediaData}>{children}</MediaContext.Provider>;
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};