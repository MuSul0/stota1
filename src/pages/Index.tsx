import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Truck, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const Index = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Sparkles,
      title: 'Reinigungsservice',
      description: 'Professionelle Reinigung für Büros, Praxen und Privathaushalte',
      features: ['Grundreinigung', 'Fensterreinigung', 'Teppichreinigung', 'Hygienische Desinfektion']
    },
    {
      icon: Truck,
      title: 'Transportdienst',
      description: 'Zuverlässiger Transport für Möbel, Umzüge und Waren',
      features: ['Möbeltransport', 'Umzugshilfe', 'Express-Kurier', 'Sperrguttransport']
    },
    {
      icon: Home,
      title: 'Komplettservice',
      description: 'Alles aus einer Hand - von der Reinigung bis zum Umzug',
      features: ['Umzugsplanung', 'Möbelmontage', 'Entrümpelung', 'Endreinigung']
    }
  ];

  const stats = [
    { value: '500+', label: 'Zufriedene Kunden' },
    { value: '24/7', label: 'Erreichbarkeit' },
    { value: '10+', label: 'Jahre Erfahrung' },
    { value: '98%', label: 'Weiterempfehlungen' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <Hero />

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professionelle Dienstleistungen für Privat- und Geschäftskunden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">
                    Mehr erfahren
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kundenstimmen</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Was unsere Kunden über uns sagen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-medium">MS</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Maria Schneider</h3>
                    <p className="text-sm text-gray-500">München</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Nikolai Transport hat unseren Umzug perfekt organisiert. Alles verlief reibungslos und die Mitarbeiter waren äußerst professionell."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-medium">TW</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Thomas Weber</h3>
                    <p className="text-sm text-gray-500">Augsburg</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Die wöchentliche Büroreinigung ist immer pünktlich und gründlich. Sehr zuverlässiger Service!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-medium">AM</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Andrea Müller</h3>
                    <p className="text-sm text-gray-500">Nürnberg</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Der Transport unseres neuen Konferenztisches war perfekt. Das Team war sehr vorsichtig und professionell."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für Ihren Service?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <a href="/kontakt">Jetzt anfragen</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <a href="tel:+49123456789">+49 123 456 789</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;