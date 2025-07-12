import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAllMedia } from '@/hooks/useAllMedia';
import { Loader2, CameraOff } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-24 sm:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="inline-block bg-slate-700/50 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ✨ Vorher & Nachher
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Unsere Arbeit im Detail
          </motion.h1>
          <motion.p 
            className="text-lg leading-8 text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Sehen Sie die Verwandlung. Von Transport und Entsorgung bis hin zu Reinigung und Gartenbau – unsere Projekte sprechen für sich.
          </motion.p>
        </div>
      </section>

      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          {categories.length > 2 && (
            <div className="flex justify-center mb-16">
              <div className="p-1.5 flex gap-2 rounded-full bg-muted">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? 'default' : 'ghost'}
                    onClick={() => setCategoryFilter(category)}
                    className="capitalize rounded-full px-6"
                    size="lg"
                  >
                    {formatCategoryName(category)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {filteredProjects.length > 0 && (
                <div className="mb-20">
                  <h2 className="text-3xl font-bold text-center mb-4">Vorher-Nachher-Projekte</h2>
                  <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                    Sehen Sie den direkten Vergleich unserer Arbeit. Bewegen Sie den Schieberegler, um die Verwandlung zu entdecken.
                  </p>
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    layout
                  >
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                  <h2 className="text-3xl font-bold text-center mb-4">Weitere Eindrücke</h2>
                  <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                    Eine Sammlung weiterer Bilder und Videos aus unseren vielfältigen Projekten.
                  </p>
                   <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    layout
                  >
                    {filteredSingles.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <SingleMediaCard item={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                 </div>
              )}

              {filteredProjects.length === 0 && filteredSingles.length === 0 && !loading && (
                <div className="text-center text-muted-foreground py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-muted">
                    <CameraOff className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Keine Ergebnisse</h3>
                  <p>Für diese Kategorie wurden leider keine Medien gefunden.</p>
                  <p>Bitte versuchen Sie eine andere Auswahl oder schauen Sie später wieder vorbei.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Galerie;