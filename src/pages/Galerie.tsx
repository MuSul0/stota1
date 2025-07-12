import { useState, useMemo } from 'react';
import { Play, Eye, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/useMedia';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Galerie = () => {
  const [activeFilter, setActiveFilter] = useState('Alle');
  const { media: allMedia, loading: loadingMedia, error: mediaError } = useMedia();

  // Fetch specific images for Before/After and Video sections
  const { media: officeBefore, loading: loadingOfficeBefore } = useMedia({ title: 'Office Cleaning Before', type: 'image' });
  const { media: officeAfter, loading: loadingOfficeAfter } = useMedia({ title: 'Office Cleaning After', type: 'image' });
  const { media: kitchenBefore, loading: loadingKitchenBefore } = useMedia({ title: 'Kitchen Cleaning Before', type: 'image' });
  const { media: kitchenAfter, loading: loadingKitchenAfter } = useMedia({ title: 'Kitchen Cleaning After', type: 'image' });
  const { media: officeTimelapse, loading: loadingOfficeTimelapse } = useMedia({ title: 'Office Cleaning Timelapse', type: 'video' });
  const { media: familyMoveVideo, loading: loadingFamilyMoveVideo } = useMedia({ title: 'Family Move Documented', type: 'video' });

  // Transform fetched media into the structure expected by the component
  const projects = useMemo(() => {
    if (!allMedia || !ArrayisArray(allMedia)) return [];
    return allMedia.map(item => {
      let category = 'Sonstiges'; // Default category
      if (item.title.toLowerCase().includes('reinigung')) {
        category = 'Reinigung';
      } else if (item.title.toLowerCase().includes('umzug')) {
        category = 'Umzug';
      } else if (item.title.toLowerCase().includes('transport')) {
        category = 'Transport';
      }
      return {
        title: item.title,
        category: category,
        description: item.title, // Using title as description for simplicity
        imageUrl: item.url,
        type: item.type,
        id: item.id, // Keep ID for key
      };
    });
  }, [allMedia]);

  const categories = ['Alle', 'Reinigung', 'Transport', 'Umzug', 'Sonstiges'];

  const filteredProjects = activeFilter === 'Alle' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  if (loadingMedia || loadingOfficeBefore || loadingOfficeAfter || loadingKitchenBefore || loadingKitchenAfter || loadingOfficeTimelapse || loadingFamilyMoveVideo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Galerie...</p>
      </div>
    );
  }

  if (mediaError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Fehler beim Laden der Galerie: {mediaError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-28 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Unsere Galerie
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Tauchen Sie ein in unsere Welt der Transformation. Hier sehen Sie die Ergebnisse unserer Arbeit – von makelloser Reinigung bis zu reibungslosen Umzügen.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mr-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`transition-all duration-200 ${
                  activeFilter === category 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.imageUrl || "https://via.placeholder.com/400x250?text=Bild+nicht+gefunden"} // Fallback image
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <Badge 
                      className={`absolute top-4 left-4 ${
                        project.category === 'Reinigung' ? 'bg-green-500' :
                        project.category === 'Transport' ? 'bg-blue-500' :
                        project.category === 'Umzug' ? 'bg-orange-500' :
                        'bg-gray-500' // Default for 'Sonstiges'
                      } text-white`}
                    >
                      {project.category}
                    </Badge>

                    {/* Type Icon */}
                    <div className="absolute top-4 right-4">
                      {project.type === 'video' ? (
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <Play className="h-5 w-5 text-white ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="bg-white/90 text-gray-800 hover:bg-white">
                        {project.type === 'video' ? 'Video ansehen' : 'Bild vergrößern'}
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              🎥 Video-Galerie
            </motion.div>
            <motion.h2
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stotta Transport in Aktion
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sehen Sie uns bei der Arbeit und überzeugen Sie sich von unserer Professionalität
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={officeTimelapse?.url || "https://via.placeholder.com/400x250?text=Video+Vorschau"} // Fallback image
                    alt="Büroreinigung Zeitraffer"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-200">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <p className="font-medium">Büroreinigung im Zeitraffer</p>
                      <p className="text-sm opacity-90">2:30 Min</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Professionelle Büroreinigung</h3>
                  <p className="text-gray-600">
                    Sehen Sie, wie unser Team ein 300m² Büro in nur 3 Stunden 
                    perfekt reinigt und dabei höchste Qualitätsstandards einhält.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={familyMoveVideo?.url || "https://via.placeholder.com/400x250?text=Video+Vorschau"} // Fallback image
                    alt="Familienumzug dokumentiert"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-200">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <p className="font-medium">Familienumzug dokumentiert</p>
                      <p className="text-sm opacity-90">4:15 Min</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Kompletter Umzugsservice</h3>
                  <p className="text-gray-600">
                    Von der Planung bis zum letzten Karton – ein kompletter 
                    Familienumzug mit Verpackung, Transport und Möbelmontage.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ⚡ Vorher & Nachher
            </motion.div>
            <motion.h2
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Der Unterschied, den wir machen
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sehen Sie selbst, wie professionelle Arbeit Räume verwandelt
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
                    <h3 className="text-xl font-bold">Büroreinigung</h3>
                    <p className="text-blue-100">Transformation eines Arbeitsplatzes</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Vorher</p>
                        <img 
                          src={officeBefore?.url || "https://via.placeholder.com/200x150?text=Vorher"} // Fallback image
                          alt="Unordentliches Büro vor der Reinigung"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Nachher</p>
                        <img 
                          src={officeAfter?.url || "https://via.placeholder.com/200x150?text=Nachher"} // Fallback image
                          alt="Perfekt gereinigtes Büro"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4">
                    <h3 className="text-xl font-bold">Wohnungsreinigung</h3>
                    <p className="text-green-100">Küche nach Grundreinigung</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Vorher</p>
                        <img 
                          src={kitchenBefore?.url || "https://via.placeholder.com/200x150?text=Vorher"} // Fallback image
                          alt="Verschmutzte Küche vor der Reinigung"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Nachher</p>
                        <img 
                          src={kitchenAfter?.url || "https://via.placeholder.com/200x150?text=Nachher"} // Fallback image
                          alt="Glänzende saubere Küche"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Möchten Sie auch solche Ergebnisse?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Kontaktieren Sie uns und lassen Sie uns gemeinsam Ihr nächstes Projekt verwirklichen.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-200 rounded-full px-10 py-6 shadow-xl font-semibold text-lg" asChild>
              <Link to="/kontakt">Projekt anfragen</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-10 py-6 shadow-xl font-semibold text-lg" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;