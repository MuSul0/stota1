import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAllMedia } from '@/hooks/useAllMedia';
import { Loader2, CameraOff, ArrowLeft } from 'lucide-react';
import { BeforeAfterCard } from '@/components/BeforeAfterCard';
import { SingleMediaCard } from '@/components/SingleMediaCard';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  page_context: string | null;
}

interface Project {
  id: string;
  title: string;
  category: string | null;
  before: MediaItem;
  after: MediaItem;
}

const formatCategoryName = (name: string | undefined): string => {
  if (!name) return 'Kategorie';
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const pairMedia = (media: MediaItem[]) => {
  const projects: Project[] = [];
  const pairedIds = new Set<string>();
  const images = media.filter(item => item.type === 'image');

  for (const item of images) {
    if (pairedIds.has(item.id)) continue;
    const isBefore = item.title.toLowerCase().endsWith('_vorher');
    const isAfter = item.title.toLowerCase().endsWith('_nachher');
    if (isBefore || isAfter) {
      const baseTitle = item.title.replace(/_vorher|_nachher/i, '');
      const partnerSuffix = isBefore ? '_nachher' : '_vorher';
      const partner = images.find(p => p.id !== item.id && !pairedIds.has(p.id) && p.title.replace(/_vorher|_nachher/i, '') === baseTitle && p.title.toLowerCase().endsWith(partnerSuffix));
      if (partner) {
        const before = isBefore ? item : partner;
        const after = isAfter ? item : partner;
        projects.push({ id: baseTitle, title: baseTitle.replace(/[-_]/g, ' '), category: item.page_context, before, after });
        pairedIds.add(item.id);
        pairedIds.add(partner.id);
      }
    }
  }
  const remainingSingles = media.filter(item => !pairedIds.has(item.id));
  return { projects, singles: remainingSingles };
};

const GalerieKategorie = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { media, loading, error } = useAllMedia();

  const { projects, singles } = useMemo(() => {
    if (!media || !categorySlug) return { projects: [], singles: [] };
    const categoryMedia = media.filter(item => item.page_context === categorySlug);
    return pairMedia(categoryMedia);
  }, [media, categorySlug]);

  const categoryName = formatCategoryName(categorySlug);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center text-red-500">Fehler: {error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-24 sm:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {categoryName}
          </motion.h1>
          <motion.p 
            className="text-lg leading-8 text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Entdecken Sie unsere abgeschlossenen Projekte in dieser Kategorie.
          </motion.p>
        </div>
      </section>

      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Button asChild variant="outline">
              <Link to="/galerie" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {projects.length === 0 && singles.length === 0 ? (
                <div className="text-center text-muted-foreground py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-muted"><CameraOff className="w-8 h-8" /></div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Keine Projekte gefunden</h3>
                  <p>Für die Kategorie "{categoryName}" gibt es noch keine Einträge.</p>
                </div>
              ) : (
                <>
                  {projects.length > 0 && (
                    <div className="mb-20">
                      <h2 className="text-3xl font-bold text-center mb-4">Vorher-Nachher-Projekte</h2>
                      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Bewegen Sie den Schieberegler, um die Verwandlung zu sehen.</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map(p => <BeforeAfterCard key={p.id} before={p.before} after={p.after} title={p.title} />)}
                      </div>
                    </div>
                  )}
                  {singles.length > 0 && (
                    <div>
                      <h2 className="text-3xl font-bold text-center mb-4">Weitere Eindrücke</h2>
                      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Weitere Bilder und Videos aus unseren Projekten.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {singles.map(item => <SingleMediaCard key={item.id} item={item} />)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalerieKategorie;