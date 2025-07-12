import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Home, Briefcase, Building, Car, Paintbrush, CheckCircle } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';

const Reinigung = () => {
  const { media: heroBackground, loading: loadingHeroBackground } = useMedia({ title: 'Reinigung Hero Background' });

  const cleaningServices = [
    {
      icon: Sparkles,
      title: 'Grundreinigung',
      description: 'Tiefenreinigung für ein makelloses Ergebnis, ideal nach Renovierungen oder vor dem Einzug.',
      features: ['Umfassende Reinigung', 'Schwer zugängliche Bereiche', 'Spezialreiniger', 'Glanzpolitur']
    },
    {
      icon: Home,
      title: 'Unterhaltsreinigung',
      description: 'Regelmäßige Reinigung für dauerhafte Sauberkeit in privaten Haushalten und kleinen Büros.',
      features: ['Wöchentlich/Monatlich', 'Staubwischen', 'Bodenreinigung', 'Bad- & Küchenhygiene']
    },
    {
      icon: Briefcase,
      title: 'Büroreinigung',
      description: 'Professionelle Reinigung Ihrer Geschäftsräume für ein hygienisches und produktives Arbeitsumfeld.',
      features: ['Tägliche/Wöchentliche Reinigung', 'Desinfektion', 'Müllentsorgung', 'Flexibilität']
    },
    {
      icon: Building,
      title: 'Treppenhausreinigung',
      description: 'Saubere und gepflegte Treppenhäuser für Mehrfamilienhäuser und Bürogebäude.',
      features: ['Regelmäßige Intervalle', 'Bodenpflege', 'Geländerreinigung', 'Fenster im Treppenhaus']
    },
    {
      icon: Car,
      title: 'Fahrzeugreinigung (innen & außen)',
      description: 'Gründliche Reinigung Ihres Fahrzeugs – innen und außen, für ein strahlendes Erscheinungsbild.',
      features: ['Handwäsche', 'Felgenreinigung', 'Innenraum saugen', 'Cockpitpflege']
    },
    {
      icon: Paintbrush,
      title: 'Fahrzeugaufbereitung',
      description: 'Professionelle Aufbereitung Ihres Fahrzeugs, inklusive Politur, Innenreinigung und Geruchsentfernung.',
      features: ['Lackpolitur', 'Sitzreinigung', 'Geruchsentfernung', 'Scheibenversiegelung']
    },
    {
      icon: CheckCircle,
      title: 'Spezialreinigung',
      description: 'Reinigung nach besonderen Ereignissen wie Umzügen, Bauarbeiten oder Wasserschäden.',
      features: ['Baureinigung', 'Umzugsreinigung', 'Desinfektionsreinigung', 'Geruchsneutralisation']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900 text-white relative overflow-hidden"
        style={{ backgroundImage: `url(${heroBackground?.url || 'https://placehold.co/1920x600/6b46c1/ffffff?text=Reinigung'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Reinigung: Glanz & Hygiene für Ihr Zuhause & Geschäft
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Wir bieten professionelle Reinigungsdienste für Privat- und Gewerbekunden. Von der Grundreinigung bis zur Fahrzeugaufbereitung – wir sorgen für makellose Sauberkeit.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Unsere Reinigungsleistungen im Detail</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vertrauen Sie auf unsere Kompetenz für Sauberkeit in Nürnberg und Umgebung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cleaningServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-4">{service.description}</CardDescription>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für makellose Sauberkeit?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Fordern Sie jetzt ein unverbindliches Angebot für Ihre individuelle Reinigung an.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link to="/kontakt">Reinigungstermin vereinbaren</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reinigung;