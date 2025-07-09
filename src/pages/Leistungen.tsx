import { Sparkles, Truck, Home, CheckCircle, Clock, Euro } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';

const Leistungen = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Reinigungsservice',
      subtitle: 'Professionelle Reinigung für jeden Bedarf',
      description: 'Von der regelmäßigen Büroreinigung bis zur Grundreinigung nach dem Umzug – wir sorgen für Sauberkeit und Hygiene.',
      features: [
        'Büro- und Praxisreinigung',
        'Haushaltsreinigung',
        'Fenster- und Glasreinigung',
        'Grundreinigung',
        'Teppich- und Polsterreinigung',
        'Treppenhausreinigung'
      ],
      pricing: 'Ab 25€/Stunde',
      availability: 'Mo-Sa, 7:00-18:00',
      imageAlt: 'Professionelle Reinigungskraft bei der Arbeit in modernem Büro',
      imageUrl: 'https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/service-detail-cleaning.jpg'
    },
    {
      icon: Truck,
      title: 'Transport & Kurierdienst',
      subtitle: 'Schnell und sicher von A nach B',
      description: 'Ob Eilsendung oder Möbeltransport – wir bringen Ihre Güter sicher und pünktlich ans Ziel.',
      features: [
        'Kleintransporte bis 3,5t',
        'Express-Kurierdienst',
        'Möbel- und Gerätetransport',
        'Dokumententransport',
        'Sperrguttransport',
        'Regionale und überregionale Fahrten'
      ],
      pricing: 'Ab 45€/Fahrt',
      availability: '24/7 verfügbar',
      imageAlt: 'Nikolai Transport Fahrzeug beim sicheren Beladen von Möbeln',
      imageUrl: 'https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/service-detail-transport.jpg'
    },
    {
      icon: Home,
      title: 'Umzugshilfe & Montage',
      subtitle: 'Ihr Umzug in professionellen Händen',
      description: 'Vom Verpacken bis zum Aufbau in der neuen Wohnung – wir begleiten Sie durch Ihren gesamten Umzug.',
      features: [
        'Komplette Umzugsplanung',
        'Verpackungsservice',
        'Möbelmontage und -demontage',
        'Entrümpelung',
        'Kartonage und Material',
        'Endreinigung der alten Wohnung'
      ],
      pricing: 'Ab 35€/Stunde pro Person',
      availability: 'Mo-Sa, nach Vereinbarung',
      imageAlt: 'Umzugsteam beim professionellen Verpacken und Transportieren',
      imageUrl: 'https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/service-detail-moving.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/services-hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Unsere Leistungen
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Professionelle Dienstleistungen für Privat- und Geschäftskunden. 
              Zuverlässig, schnell und zu fairen Preisen.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                      <p className="text-gray-600">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Euro className="h-4 w-4" />
                      <span>{service.pricing}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.availability}</span>
                    </Badge>
                  </div>

                  <Button size="lg" asChild>
                    <Link to="/kontakt">Angebot anfordern</Link>
                  </Button>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="rounded-lg h-96 flex items-center justify-center overflow-hidden shadow-lg">
                    <img 
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
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