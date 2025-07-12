import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAllMedia } from '@/hooks/useAllMedia';
import { Loader2 } from 'lucide-react';
import { BeforeAfterCard } from '@/components/BeforeAfterCard';
import { SingleMediaCard } from '@/components/SingleMediaCard';

// Define types for clarity
interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  page_context: string | null;
  description: string | null;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  category: string | null;
  before: MediaItem;
  after: MediaItem;
}

// Helper to format category names for display
const formatCategoryName = (name: string): string => {
  if (name === 'all') return 'Alle Kategorien';
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper to pair media items into projects
const pairMedia = (media: MediaItem[]) => {
  const projects: Project[] = [];
  const pairedIds = new Set<string>();

  // Prioritize image pairs
  const images = media.filter(item => item.type === 'image');

  for (const item of images) {
    if (pairedIds.has(item.id)) continue;

    const isBefore = item.title.toLowerCase().endsWith('_vorher');
    const isAfter = item.title.toLowerCase().endsWith('_nachher');

    if (isBefore || isAfter) {
      const baseTitle = item.title.replace(/_vorher|_nachher/i, '');
      
      const partnerSuffix = isBefore ? '_nachher' : '_vorher';
      const partner = images.find(
        p => p.id !== item.id && 
             !pairedIds.has(p.id) &&
             p.title.replace(/_vorher|_nachher/i, '') === baseTitle &&
             p.title.toLowerCase().endsWith(partnerSuffix)
      );

      if (partner) {
        const before = isBefore ? item : partner;
        const after = isAfter ? item : partner;
        
        projects.push({
          id: baseTitle,
          title: baseTitle.replace(/[-_]/g, ' '),
          category: item.page_context,
          before,
          after,
        });
        
        pairedIds.add(item.id);
        pairedIds.add(partner.id);
      }
    }
  }

  // Filter out paired items from singles
  const remainingSingles = media.filter(item => !pairedIds.has(item.id));

  return { projects, singles: remainingSingles };
};


const Galerie = () => {
  const { media, loading, error } = useAllMedia();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const { projects, singles, categories } = useMemo(() => {
    if (!media) return { projects: [], singles: [], categories: [] };
    
    const allContexts = media
      .map(item => item.page_context)
      .filter((context): context is string => !!context);
    const uniqueCategories = ['all', ...Array.from(new Set(allContexts))];
    
    const { projects, singles } = pairMedia(media);

    return { projects, singles, categories: uniqueCategories };
  }, [media]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => categoryFilter === 'all' || p.category === categoryFilter);
  }, [projects, categoryFilter]);

  const filteredSingles = useMemo(() => {
    return singles.filter(s => categoryFilter === 'all' || s.page_context === categoryFilter);
  }, [singles, categoryFilter]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center text-red-500">
          Fehler beim Laden der Galerie: {error}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✨ Vorher & Nachher
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Unsere Arbeit im Detail
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Sehen Sie die Verwandlung. Von Transport und Entsorgung bis hin zu Reinigung und Gartenbau – unsere Projekte sprechen für sich.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {categories.length > 2 && (
            <div className="flex justify-center gap-3 flex-wrap mb-12">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter(category)}
                  className="capitalize"
                >
                  {formatCategoryName(category)}
                </Button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              {filteredProjects.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-8">Vorher-Nachher-Projekte</h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    layout
                  >
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <BeforeAfterCard before={project.before} after={project.after} title={project.title} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {filteredSingles.length > 0 && (
                 <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-8">Weitere Eindrücke</h2>
                   <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    layout
                  >
                    {filteredSingles.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <SingleMediaCard item={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                 </div>
              )}

              {filteredProjects.length === 0 && filteredSingles.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-16">
                  <p className="text-lg">Für diese Kategorie wurden keine Medien gefunden.</p>
                  <p>Bitte versuchen Sie eine andere Auswahl.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;