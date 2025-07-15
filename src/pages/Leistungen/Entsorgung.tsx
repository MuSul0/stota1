import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Sofa, Zap, Leaf, Wrench, PackageX, CheckCircle } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';

const Entsorgung = () => {
  const { media: heroBackground } = useMedia({ title: 'Leistungen Header Entsorgung', pageContext: 'leistungen' });

  const disposalServices = [
    {
      icon: Sofa,
      title: 'Möbelentsorgung',
      description: 'Fachgerechte Entsorgung Ihrer alten Möbel, inklusive Abtransport und umweltfreundlicher Verwertung.',
      features: ['Abholung vor Ort', 'Demontage bei Bedarf', 'Umweltgerechte Entsorgung', 'Besenreine Übergabe']
    },
    {
      icon: Zap,
      title: 'Elektrogeräte-Entsorgung',
      description: 'Sichere und umweltfreundliche Entsorgung von Elektro- und Elektronikaltgeräten nach gesetzlichen Vorschriften.',
      features: ['WEEE-konform', 'Datenlöschung (optional)', 'Abholung von Großgeräten', 'Recycling']
    },
    {
      icon: Leaf,
      title: 'Gartenabfälle-Entsorgung',
      description: 'Entfernung und fachgerechte Entsorgung von Grünschnitt, Ästen, Laub und anderen Gartenabfällen.',
      features: ['Abtransport von Grünschnitt', 'Laubentfernung', 'Wurzelentsorgung', 'Kompostierung/Recycling']
    },
    {
      icon: Wrench,
      title: 'Renovierungsreste-Entsorgung',
      description: 'Entsorgung von Bauschutt, alten Baustoffen und Renovierungsresten – für eine saubere Baustelle.',
      features: ['Bauschuttentsorgung', 'Tapetenreste', 'Altholz', 'Mischabfall']
    },
    {
      icon: PackageX,
      title: 'Sonstige Kleinmengen unter 1 Tonne',
      description: 'Flexible Entsorgungslösungen für diverse Kleinmengen und Sondermüll bis zu 1 Tonne.',
      features: ['Sondermüll (nach Absprache)', 'Haushaltsauflösung', 'Kellerentrümpelung', 'Dachbodenentrümpelung']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-green-700 to-green-900 text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground?.url || 'https://placehold.co/1920x600/16a34a/ffffff?text=Entsorgung'})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Entsorgung: Sauber & Umweltgerecht
          </motion.h1>
          <motion.p 
            className="text-xl text-green-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Wir kümmern uns um die fachgerechte Entsorgung Ihrer alten Möbel, Elektrogeräte, Gartenabfälle und Renovierungsreste – schnell, zuverlässig und umweltbewusst.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Unsere Entsorgungsleistungen im Detail</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir bieten umfassende Entsorgungslösungen für Privat- und Gewerbekunden in Augsburg und Umgebung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disposalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-4">{service.description}</CardDescription>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
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
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entsorgen Sie Ihren Ballast!
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine schnelle und umweltgerechte Entsorgung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link to="/kontakt">Jetzt Entsorgung buchen</Link>
            </Button>
            <Button size="lg" className="bg-green-700 text-white border-white hover:bg-white hover:text-green-700" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Entsorgung;