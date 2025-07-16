import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMedia } from '@/hooks/useMedia';

const Galerie = () => {
  const { media: heroBackground } = useMedia({ title: 'Galerie Header', pageContext: 'galerie' });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground?.url || ''})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✨ Unsere Arbeit in Bildern
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Unsere Projekte</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Sehen Sie sich unsere erfolgreich abgeschlossenen Projekte an. 
              Jedes Bild erzählt eine Geschichte von Qualität, Professionalität und Zufriedenheit.
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder for new content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Galerie im Aufbau</h2>
          <p className="text-xl text-gray-600">
            Wir überarbeiten unsere Galerie, um Ihnen bald neue und aufregende Einblicke in unsere Arbeit zu geben.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Möchten Sie auch solche Ergebnisse?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns und lassen Sie uns gemeinsam Ihr nächstes Projekt verwirklichen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4" asChild>
              <Link to="/kontakt">Projekt anfragen</Link>
            </Button>
            <Button size="lg" className="bg-indigo-600 text-white border-white hover:bg-white hover:text-indigo-600 px-8 py-4" asChild>
              <a href="tel:020988339457">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;