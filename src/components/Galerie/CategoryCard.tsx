import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  slug: string;
  name: string;
  imageUrl: string | null;
}

export const CategoryCard = ({ slug, name, imageUrl }: CategoryCardProps) => {
  return (
    <Link to={`/galerie/${slug}`} className="block group">
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-video bg-slate-200 flex-shrink-0">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
              <span>Kein Vorschaubild</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white tracking-tight">{name}</h3>
        </div>
        <div className="p-4 bg-card flex-grow flex justify-between items-center">
          <span className="text-sm font-semibold text-primary">Projekte ansehen</span>
          <ArrowRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
};