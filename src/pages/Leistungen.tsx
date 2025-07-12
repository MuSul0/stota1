import { Sparkles, Truck, Home, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';

const Leistungen = () => {
  const serviceCategories = [
    {
      icon: Truck,
      title: 'Transporte',
      subtitle: 'Ihre Güter sicher ans Ziel',
      description: 'Sicherer und pünktlicher Transport Ihrer Güter – von empfindlichen Hightech-Waren bis zu kompletten Umzügen für Privat- und Firmenkunden.',
      link: '/leistungen/transporte',
      colorClass: 'from-blue-600 to-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      icon: Leaf,
      title: 'Garten- & Landschaftsbau',
      subtitle: 'Ihr Traumgarten – von der Idee zur Realität',
      description: 'Von der regelmäßigen Gartenpflege über Rasen mähen und Heckenschnitt bis hin zu Baumfällungen und der Neugestaltung Ihrer Außenanlagen.',
      link: '/leistungen/garten-landschaftsbau',
      colorClass: 'from-orange-600 to-red-800',
      iconColor: 'text-orange-600'
    },
    {
      icon: Sparkles,
      title: 'Reinigung',
      subtitle: 'Glanz & Hygiene für Ihr Zuhause & Geschäft',
      description: 'Professionelle Reinigungsdienste für Privat- und Gewerbekunden. Von der Grundreinigung bis zur Fahrzeugaufbereitung – wir sorgen für makellose Sauberkeit.',
      link: '/leistungen/reinigung',
      colorClass: 'from-purple-600 to-indigo-800',
      iconColor: 'text-purple-600'
    },
    {
      icon: Home,
      title: 'Entsorgung',
      subtitle: 'Sauber & Umweltgerecht entsorgen',
      description: 'Wir kümmern uns um die fachgerechte Entsorgung Ihrer alten Möbel, Elektrogeräte, Gartenabfälle und Renovierungsreste – schnell, zuverlässig und umweltbewusst.',
      link: '/leistungen/entsorgung',
      colorClass: 'from-green-600 to-emerald-800',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-28 bg-gradient-to-r from-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            className="text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Unsere Leistungen
          </motion.h1>
          <motion.p 
            className="text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Maßgeschneiderte Lösungen für Privat- und Geschäftskunden – professionell, zuverlässig und mit Herz.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <Card className="h-full rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-400 flex flex-col border border-transparent group-hover:border-blue-400">
                  <CardHeader className="flex items-center space-x-5 pb-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${category.colorClass} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <category.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-extrabold text-gray-900">{category.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-lg">{category.subtitle}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow text-gray-700 text-lg leading-relaxed">
                    {category.description}
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button 
                      asChild 
                      className={`w-full bg-gradient-to-r ${category.colorClass} hover:from-opacity-90 hover:to-opacity-90 text-white rounded-xl shadow-md font-semibold text-lg`}
                    >
                      <Link to={category.link} aria-label={`Mehr erfahren über ${category.title}`}>
                        Mehr erfahren
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2 
            className="text-5xl font-extrabold mb-8 drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Bereit für Ihr nächstes Projekt?
          </motion.h2>
          <motion.p 
            className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot. Wir freuen uns darauf, Sie zu unterstützen!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 rounded-full px-12 py-5 shadow-xl font-semibold text-lg" asChild>
              <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700 rounded-full px-12 py-5 shadow-xl font-semibold text-lg" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leistungen;