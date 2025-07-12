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
        <Card className="overflow-hidden group cursor-pointer h-full border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div className="relative aspect-square">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <VideoIcon className="h-16 w-16 text-slate-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold truncate text-base">{item.title}</h3>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-auto p-0 bg-transparent border-none shadow-none">
        {item.type === 'image' ? (
          <img src={item.url} alt={item.title} className="w-full h-full object-contain rounded-lg max-h-[90vh]" />
        ) : (
          <video src={item.url} className="w-full h-full rounded-lg max-h-[90vh]" controls autoPlay />
        )}
      </DialogContent>
    </Dialog>
  );
};