import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Package, Box, Building, Home, Printer, Dumbbell, Smartphone, CheckCircle } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';

const Transporte = () => {
  const { media: heroBackground } = useMedia({ title: 'Leistungen Header Transporte', pageContext: 'leistungen' });

  const transportServices = [
    {
      icon: Package,
      title: 'Hightech-Waren',
      description: 'Sicherer Transport von Elektronik, empfindlichen Geräten und IT-Infrastruktur mit spezieller Sicherung und Klimakontrolle.',
      features: ['Spezialverpackung', 'Klimakontrolle', 'Versicherung', 'Fachpersonal']
    },
    {
      icon: Box,
      title: 'Haushaltswaren',
      description: 'Zuverlässiger Transport Ihrer persönlichen Gegenstände und Möbel – sorgfältig verpackt und sicher geliefert.',
      features: ['Sorgfältige Verpackung', 'Möbeltransport', 'Küchenmontage', 'Demontage/Montage']
    },
    {
      icon: Truck,
      title: 'Expressversand',
      description: 'Schnelle und pünktliche Lieferung Ihrer eiligen Sendungen – regional und überregional.',
      features: ['24/7 Service', 'Direktlieferung', 'Sendungsverfolgung', 'Kurzfristige Buchung']
    },
    {
      icon: Building,
      title: 'Umzüge für Firmenkunden',
      description: 'Professionelle und reibungslose Firmenumzüge, minimieren Sie Ausfallzeiten und Störungen Ihres Betriebs.',
      features: ['Büro-Demontage/Montage', 'IT-Umzug', 'Archivtransport', 'Diskretion']
    },
    {
      icon: Home,
      title: 'Umzüge für private Haushalte',
      description: 'Stressfreier Umzug für Familien und Einzelpersonen – wir kümmern uns um jedes Detail, von A bis Z.',
      features: ['Komplettumzug', 'Verpackungsservice', 'Möbelmontage', 'Endreinigung']
    },
    {
      icon: Printer,
      title: 'Drucker-Transport + Einrichtung',
      description: 'Spezialtransport und fachgerechte Installation von Druckern und Großformatplottern.',
      features: ['Sicherer Transport', 'Anschluss & Konfiguration', 'Funktionstest', 'Einweisung']
    },
    {
      icon: Dumbbell,
      title: 'Fitnessgeräte-Transport + Aufbau',
      description: 'Transport und professioneller Aufbau Ihrer Fitnessgeräte – für Ihr Home-Gym oder Fitnessstudio.',
      features: ['Demontage/Montage', 'Sicherer Transport', 'Funktionstest', 'Platzierung nach Wunsch']
    },
    {
      icon: Smartphone,
      title: 'Mobilgeräte & Elektroware (bis 1 Tonne)',
      description: 'Spezialisierter Transport für kleinere, aber wertvolle Elektrogeräte und Mobilgeräte bis 1 Tonne.',
      features: ['Stoßsicherer Transport', 'Temperaturkontrolle', 'GPS-Tracking', 'Schnelle Lieferung']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground?.url || 'https://placehold.co/1920x600/1d4ed8/ffffff?text=Transporte'})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Transporte: Ihre Güter sicher ans Ziel
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Ob empfindliche Hightech-Waren, komplette Umzüge oder eilige Expresslieferungen – wir transportieren Ihre Güter zuverlässig, schnell und mit größter Sorgfalt.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Unsere Transportleistungen im Detail</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir bieten maßgeschneiderte Transportlösungen für Privat- und Firmenkunden in München und Umgebung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transportServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-blue-600" />
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für Ihren Transport?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein unverbindliches Angebot und eine schnelle Abwicklung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/kontakt">Jetzt Transport anfragen</Link>
            </Button>
            <Button size="lg" className="bg-blue-700 text-white border-white hover:bg-white hover:text-blue-700" asChild>
              <a href="tel:020988339457">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Transporte;