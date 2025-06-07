import { Sparkles, Truck, Home, Star, Users, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Reinigungsservice',
      description: 'Professionelle Reinigung für Privat und Gewerbe',
      features: ['Büroreinigung', 'Haushaltsreinigung', 'Fensterreinigung', 'Grundreinigung'],
      imageAlt: 'Saubere moderne Küche nach professioneller Reinigung'
    },
    {
      icon: Truck,
      title: 'Transport & Kurier',
      description: 'Schnelle und sichere Transportlösungen',
      features: ['Kleintransporte', 'Kurierdienst', 'Möbeltransport', 'Express-Service'],
      imageAlt: 'Weißer Transporter von Nikolai Transport beim Beladen'
    },
    {
      icon: Home,
      title: 'Umzugshilfe',
      description: 'Komplette Umzugsbetreuung mit Möbelmontage',
      features: ['Umzugsplanung', 'Verpackungsservice', 'Möbelmontage', 'Entrümpelung'],
      imageAlt: 'Freundliche Umzugshelfer tragen Möbel in neue Wohnung'
    }
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Zufriedene Kunden' },
    { icon: Star, number: '4.9', label: 'Durchschnittsbewertung' },
    { icon: Clock, number: '24/7', label: 'Erreichbarkeit' },
    { icon: Truck, number: '1000+', label: 'Erfolgreiche Aufträge' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <Hero />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Von der Reinigung bis zum Umzug – wir sind Ihr verlässlicher Partner 
              für alle Dienstleistungen rund um Ihr Zuhause und Ihr Unternehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/leistungen">Alle Leistungen ansehen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-200" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum Nikolai Transport?</h2>
            <p className="text-xl text-gray-600">
              Vertrauen Sie auf unsere Erfahrung und Professionalität
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Zuverlässigkeit</h3>
                <p className="text-gray-600">
                  Pünktlich, verlässlich und immer zu Ihren Diensten. 
                  Darauf können Sie sich verlassen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualität</h3>
                <p className="text-gray-600">
                  Höchste Qualitätsstandards bei allen unseren Dienstleistungen. 
                  Ihre Zufriedenheit ist unser Anspruch.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Menschlichkeit</h3>
                <p className="text-gray-600">
                  Wir behandeln Ihr Eigentum wie unser eigenes und gehen 
                  respektvoll mit Ihren Wünschen um.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für Ihren nächsten Auftrag?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute für ein unverbindliches Angebot. 
            Wir freuen uns darauf, Ihnen zu helfen!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;