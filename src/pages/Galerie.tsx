import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAllMedia } from '@/hooks/useAllMedia';
import { Loader2, Video as VideoIcon, Maximize } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const formatCategoryName = (name: string): string => {
  if (name === 'all') return 'Alle Kategorien';
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Galerie = () => {
  const { media, loading, error } = useAllMedia();
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = useMemo(() => {
    if (!media) return [];
    const allContexts = media
      .map(item => item.page_context)
      .filter((context): context is string => !!context);
    return ['all', ...Array.from(new Set(allContexts))];
  }, [media]);

  const filteredMedia = useMemo(() => {
    return media
      .filter(item => typeFilter === 'all' || item.type === typeFilter)
      .filter(item => categoryFilter === 'all' || item.page_context === categoryFilter);
  }, [media, typeFilter, categoryFilter]);

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

      {/* Hero Section */}
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
              ✨ Einblicke in unsere Arbeit
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Unsere Projekte in Bildern
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Von Transport und Entsorgung bis hin zu Reinigung und Gartenbau – entdecken Sie die Vielfalt und Qualität unserer Dienstleistungen.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-col items-center gap-6 mb-12">
            {categories.length > 2 && (
              <div className="flex justify-center gap-3 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? 'default' : 'outline'}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {formatCategoryName(category)}
                  </Button>
                ))}
              </div>
            )}
            <div className="flex justify-center gap-3">
              <Button variant={typeFilter === 'all' ? 'default' : 'outline'} onClick={() => setTypeFilter('all')}>Alle Medien</Button>
              <Button variant={typeFilter === 'image' ? 'default' : 'outline'} onClick={() => setTypeFilter('image')}>Bilder</Button>
              <Button variant={typeFilter === 'video' ? 'default' : 'outline'} onClick={() => setTypeFilter('video')}>Videos</Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              layout
            >
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
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
                            <p className="text-sm text-gray-500 capitalize">{item.type}</p>
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
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-16">
                  <p className="text-lg">Keine Medien für die ausgewählten Filter gefunden.</p>
                  <p>Bitte versuchen Sie eine andere Auswahl.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;