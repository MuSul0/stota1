import { useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useAllMedia } from '@/hooks/useAllMedia';
import { Loader2 } from 'lucide-react';
import { CategoryCard } from '@/components/Galerie/CategoryCard';

const formatCategoryName = (name: string): string => {
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Galerie = () => {
  const { media, loading, error } = useAllMedia();

  const categories = useMemo(() => {
    if (!media) return [];
    const categoryMap = new Map<string, { name: string; slug: string; imageUrl: string | null }>();
    
    media.forEach(item => {
      if (item.page_context) {
        if (!categoryMap.has(item.page_context)) {
          categoryMap.set(item.page_context, {
            name: formatCategoryName(item.page_context),
            slug: item.page_context,
            imageUrl: item.type === 'image' ? item.url : null,
          });
        } else {
          const cat = categoryMap.get(item.page_context);
          if (cat && !cat.imageUrl && item.type === 'image') {
            cat.imageUrl = item.url;
          }
        }
      }
    });
    return Array.from(categoryMap.values());
  }, [media]);

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
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Unsere Projekt-Galerie
          </motion.h1>
          <motion.p 
            className="text-lg leading-8 text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Wählen Sie eine Kategorie, um sich von der Qualität unserer Arbeit zu überzeugen.
          </motion.p>
        </div>
      </section>

      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CategoryCard slug={cat.slug} name={cat.name} imageUrl={cat.imageUrl} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Galerie;