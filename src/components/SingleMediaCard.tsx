import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Maximize, Video as VideoIcon } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
}

interface SingleMediaCardProps {
  item: MediaItem;
}

export const SingleMediaCard = ({ item }: SingleMediaCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden group cursor-pointer h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="relative">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <div className="w-full h-64 bg-black flex items-center justify-center">
                <VideoIcon className="h-16 w-16 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold truncate">{item.title}</h3>
            <p className="text-sm text-gray-500 capitalize">Einzelnes Medium</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-auto p-2 bg-transparent border-none shadow-none">
        {item.type === 'image' ? (
          <img src={item.url} alt={item.title} className="w-full h-full object-contain rounded-lg" />
        ) : (
          <video src={item.url} className="w-full h-full rounded-lg" controls autoPlay />
        )}
      </DialogContent>
    </Dialog>
  );
};