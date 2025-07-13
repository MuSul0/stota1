import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAllMedia } from '@/hooks/useAllMedia';
import { Loader2, Video, ImageOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { getUniqueDbTitle } from '@/lib/mediaUtils';

const Galerie = () => {
  const { media, loading, error } = useAllMedia();

  const getMediaUrl = (title: string, pageContext: string) => {
    const expectedDbTitle = getUniqueDbTitle(title, pageContext, 'image');
    const mediaItem = media.find(item => item.title === expectedDbTitle);
    return mediaItem?.url;
  };

  const heroImage = getMediaUrl('Galerie Hero Bild', 'galerie');

  const images = media.filter(item => item.type === 'image' && item.page_context !== 'startseite' && item.page_context !== 'leistungen' && item.page_context !== 'ueber-uns' && item.page_context !== 'empfehlungsprogramm' && item.page_context !== 'kontakt' && item.page_context !== 'galerie');
  const videos = media.filter(item => item.type === 'video');

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      );
    }

    if (error) {
      return <div className="text-center py-20 text-red-600">Fehler beim Laden der Medien: {error}</div>;
    }

    const galleryItems = [...images, ...videos];
    if (galleryItems.length === 0) {
      return (
        <div className="text-center py-20">
          <ImageOff className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Die Galerie ist noch leer</h3>
          <p className="text-gray-500 mt-2">Besuchen Sie den Admin-Bereich, um die ersten Bilder und Videos hochzuladen.</p>
        </div>
      );
    }

    return (
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images">Bilder ({images.length})</TabsTrigger>
          <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="images">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <CardContent className="p-0">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img src={item.url} alt={item.title} className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
           {images.length === 0 && <p className="text-center py-10 text-gray-500">Keine Bilder in der Galerie vorhanden.</p>}
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                 <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                  <CardContent className="p-0 flex flex-col items-center justify-center h-60 bg-gray-900 text-white">
                      <Video className="h-16 w-16 text-gray-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                      <p className="text-center font-semibold px-2">{item.description || item.title}</p>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
          {videos.length === 0 && <p className="text-center py-10 text-gray-500">Keine Videos in der Galerie vorhanden.</p>}
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section 
        className="py-20 bg-cover bg-center text-white relative overflow-hidden"
        style={{ backgroundImage: `linear-gradient(to right, rgba(30, 64, 175, 0.8), rgba(109, 40, 217, 0.8)), url(${heroImage || 'https://placehold.co/1920x600/6d28d9/ffffff?text=Galerie'})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">✨ Unsere Arbeit in Bildern</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Unsere Projekte</h1>
            <p className="text-xl text-blue-100 leading-relaxed">Sehen Sie sich unsere erfolgreich abgeschlossenen Projekte an. Jedes Bild erzählt eine Geschichte von Qualität, Professionalität und Zufriedenheit.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">{renderContent()}</div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Möchten Sie auch solche Ergebnisse?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Kontaktieren Sie uns und lassen Sie uns gemeinsam Ihr nächstes Projekt verwirklichen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4" asChild>
              <Link to="/kontakt">Projekt anfragen</Link>
            </Button>
            <Button size="lg" className="bg-indigo-600 text-white border-white hover:bg-white hover:text-indigo-600 px-8 py-4" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;