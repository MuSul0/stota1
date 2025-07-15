import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Scissors, TreeDeciduous, Palette, HardHat, CheckCircle } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';

const GartenLandschaftsbau = () => {
  const { media: heroBackground } = useMedia({ title: 'Leistungen Header Gartenbau', pageContext: 'leistungen' });

  const gardenServices = [
    {
      icon: Leaf,
      title: 'Gartenpflege',
      description: 'Regelmäßige und professionelle Pflege Ihres Gartens, damit er das ganze Jahr über in voller Pracht erstrahlt.',
      features: ['Saisonale Pflege', 'Beetpflege', 'Düngung', 'Pflanzenschutz']
    },
    {
      icon: Scissors,
      title: 'Rasen mähen, Hecken schneiden',
      description: 'Präziser Rasenschnitt und fachgerechter Heckenschnitt für ein gepflegtes Erscheinungsbild Ihrer Außenanlagen.',
      features: ['Regelmäßiger Rasenschnitt', 'Vertikutieren', 'Heckenschnitt', 'Formschnitt']
    },
    {
      icon: TreeDeciduous,
      title: 'Baumfällung & Wurzelentfernung',
      description: 'Sichere und professionelle Baumfällungen sowie vollständige Wurzelentfernung, auch unter schwierigen Bedingungen.',
      features: ['Sicherheitsfällung', 'Wurzelstockfräsung', 'Entsorgung des Schnittguts', 'Genehmigungsberatung']
    },
    {
      icon: Palette,
      title: 'Gestaltung & Neubepflanzung',
      description: 'Individuelle Gartenplanung und -gestaltung, von der ersten Skizze bis zur vollständigen Neubepflanzung.',
      features: ['Konzeptentwicklung', 'Pflanzenauswahl', 'Beetgestaltung', 'Rollrasenverlegung']
    },
    {
      icon: HardHat,
      title: 'Terrassenbau',
      description: 'Bau und Gestaltung Ihrer Traumterrasse aus Holz, Stein oder WPC – für entspannte Stunden im Freien.',
      features: ['Materialberatung', 'Fundamentarbeiten', 'Verlegung', 'Pflegehinweise']
    },
    {
      icon: CheckCircle,
      title: 'Wege & Pflasterarbeiten',
      description: 'Anlage und Reparatur von Gartenwegen, Einfahrten und Pflasterflächen mit hochwertigen Materialien.',
      features: ['Pflasterverlegung', 'Naturstein', 'Reparaturen', 'Drainagesysteme']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-orange-700 to-red-900 text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground?.url || 'https://placehold.co/1920x600/ea580c/ffffff?text=Gartenbau'})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Garten- & Landschaftsbau: Ihr Traumgarten – von der Idee zur Realität
          </motion.h1>
          <motion.p 
            className="text-xl text-orange-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Von der regelmäßigen Gartenpflege über Rasen mähen und Heckenschnitt bis hin zu Baumfällungen und der Neugestaltung Ihrer Außenanlagen – wir sind Ihr Partner für grüne Oasen.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Unsere Garten- & Landschaftsbau Leistungen im Detail</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir gestalten und pflegen Ihre Außenbereiche in Regensburg und Umgebung mit Leidenschaft und Fachwissen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gardenServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-orange-600" />
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
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Starten Sie Ihr Gartenprojekt!
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine individuelle Beratung und ein maßgeschneidertes Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link to="/kontakt">Jetzt beraten lassen</Link>
            </Button>
            <Button size="lg" className="bg-orange-700 text-white border-white hover:bg-white hover:text-orange-700" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GartenLandschaftsbau;