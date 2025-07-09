import { Sparkles, Truck, Home, Leaf, CheckCircle, Clock, Euro } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      icon: Home, // Using Home for Entsorgung as a general "clearing out" icon
      title: 'Entsorgung',
      subtitle: 'Sauber & Umweltgerecht entsorgen',
      description: 'Wir kümmern uns um die fachgerechte Entsorgung Ihrer alten Möbel, Elektrogeräte, Gartenabfälle und Renovierungsreste – schnell, zuverlässig und umweltbewusst.',
      link: '/leistungen/entsorgung',
      colorClass: 'from-green-600 to-emerald-800',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
              Unsere Leistungen im Überblick
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Entdecken Sie unser vielfältiges Angebot an professionellen Dienstleistungen – 
              maßgeschneidert für Ihre Bedürfnisse.
            </motion.p>
          </div>
        </section>

        {/* Service Categories Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
              {serviceCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${category.colorClass} text-white shadow-lg`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">{category.title}</CardTitle>
                        <CardDescription className="text-gray-600">{category.subtitle}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700 mb-6">{category.description}</p>
                      <Button asChild className={`w-full bg-gradient-to-r ${category.colorClass} hover:from-opacity-90 hover:to-opacity-90 text-white`}>
                        <Link to={category.link}>Mehr erfahren</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                Zusätzliche Services
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Weitere Dienstleistungen für Ihren Komfort
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Notfall-Service</CardTitle>
                    <CardDescription>24/7 Bereitschaft für Notfälle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Wasserschäden, Schlüsseldienst oder dringende Transporte – 
                      wir sind auch außerhalb der Geschäftszeiten für Sie da.
                    </p>
                    <Badge variant="destructive">Aufpreis: +50%</Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Regelmäßige Termine</CardTitle>
                    <CardDescription>Langfristige Betreuung</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Wöchentliche Büroreinigung oder monatliche Grundreinigung – 
                      profitieren Sie von unseren Stammkunden-Rabatten.
                    </p>
                    <Badge variant="secondary">Bis zu 20% Rabatt</Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Beratung & Planung</CardTitle>
                    <CardDescription>Kostenlose Erstberatung</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Unsicher, welcher Service der richtige ist? Wir beraten Sie 
                      gerne kostenlos und erstellen ein maßgeschneidertes Angebot.
                    </p>
                    <Badge variant="outline">Kostenlos</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              Bereit für Ihr Projekt?
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot. 
              Wir finden die perfekte Lösung für Ihre Bedürfnisse.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" variant="secondary" asChild>
                <Link to="/kontakt">Kostenlos anfragen</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                <a href="tel:+49123456789">+49 123 456 789</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    );
  };

export default Leistungen;