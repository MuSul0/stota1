import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ParallaxSection from '@/components/ParallaxSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Truck, Home, Sparkles, Star, Quote, Users, Lightbulb, Handshake, Briefcase, Smile, Euro, PhoneCall, CalendarCheck, Wrench, ThumbsUp, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  image_url: string;
  price: string;
  popular: boolean;
}

const Index = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      const { data, error } = await supabase.from('services').select('*');
      if (error) {
        console.error('Error fetching services:', error);
        // Fallback to static data if fetching fails
        setServices([
          {
            id: 'static-1',
            icon: 'Sparkles',
            title: 'Reinigungsservice',
            description: 'Professionelle Reinigung für Büros, Praxen und Privathaushalte – für ein makelloses Ergebnis.',
            features: ['Büro- & Praxisreinigung', 'Haushaltsreinigung', 'Fenster- & Glasreinigung', 'Grundreinigung'],
            image_url: 'https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/service-cleaning.jpg',
            price: 'Ab 25€/Std.',
            popular: true
          },
          {
            id: 'static-2',
            icon: 'Truck',
            title: 'Transportdienst',
            description: 'Sicherer und pünktlicher Transport Ihrer Güter – von Möbeln bis zu Spezialsendungen.',
            features: ['Möbeltransport', 'Express-Kurier', 'Sperrguttransport', 'Regionale Fahrten'],
            image_url: 'https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/service-transport.jpg',
            price: 'Ab 45€/Fahrt',
            popular: false
          },
          {
            id: 'static-3',
            icon: 'Home',
            title: 'Umzugshilfe & Montage',
            description: 'Ihr stressfreier Umzug mit Rundum-Service – wir kümmern uns um alles.',
            features: ['Komplette Umzugsplanung', 'Verpackungsservice', 'Möbelmontage', 'Entrümpelung'],
            image_url: 'https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/service-moving.jpg',
            price: 'Ab 35€/Std.',
            popular: false
          }
        ]);
      } else {
        setServices(data as Service[]);
      }
      setLoadingServices(false);
    };

    fetchServices();
  }, []);

  // Map icon strings to LucideIcon components
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = { Sparkles, Truck, Home, CheckCircle, Clock, Euro, Star, Quote, Users, Lightbulb, Handshake, Briefcase, Smile, Wrench, PhoneCall, CalendarCheck, ThumbsUp, Gift };
    return icons[iconName] || Sparkles; // Default to Sparkles if not found
  };

  const stats = [
    { value: '500+', label: 'Zufriedene Kunden', icon: Users },
    { value: '24/7', label: 'Erreichbarkeit', icon: Clock },
    { value: '10+', label: 'Jahre Erfahrung', icon: Lightbulb },
    { value: '98%', label: 'Weiterempfehlungen', icon: Handshake }
  ];

  const advantages = [
    {
      icon: Briefcase,
      title: 'Erfahrung & Expertise',
      description: 'Über 10 Jahre Branchenerfahrung garantieren höchste Qualität und Effizienz bei jedem Auftrag.'
    },
    {
      icon: Smile,
      title: 'Kundenzufriedenheit',
      description: 'Ihre Bedürfnisse stehen im Mittelpunkt. Wir bieten maßgeschneiderte Lösungen und persönlichen Service.'
    },
    {
      icon: Wrench, // Changed from Tool to Wrench
      title: 'Modernste Ausstattung',
      description: 'Dank modernem Equipment und bewährten Methoden führen wir alle Arbeiten sicher und präzise aus.'
    },
    {
      icon: Euro,
      title: 'Transparente Preise',
      description: 'Faire und nachvollziehbare Kosten ohne versteckte Gebühren. Sie wissen immer, woran Sie sind.'
    }
  ];

  const howItWorksSteps = [
    {
      icon: PhoneCall,
      title: '1. Kontakt & Beratung',
      description: 'Nehmen Sie unverbindlich Kontakt mit uns auf. Wir besprechen Ihr Anliegen und beraten Sie umfassend zu unseren Leistungen.'
    },
    {
      icon: CalendarCheck,
      title: '2. Planung & Angebot',
      description: 'Basierend auf Ihren Anforderungen erstellen wir ein maßgeschneidertes Angebot und planen den Ablauf detailliert mit Ihnen.'
    },
    {
      icon: Wrench,
      title: '3. Professionelle Ausführung',
      description: 'Unser erfahrenes Team führt den Auftrag pünktlich, zuverlässig und mit höchster Sorgfalt aus.'
    },
    {
      icon: ThumbsUp,
      title: '4. Zufriedenheit & Nachbereitung',
      description: 'Nach Abschluss des Projekts stellen wir Ihre vollkommene Zufriedenheit sicher und stehen für Rückfragen bereit.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Schneider',
      location: 'München',
      rating: 5,
      text: 'Nikolai Transport hat unseren Umzug perfekt organisiert. Alles verlief reibungslos und die Mitarbeiter waren äußerst professionell.',
      initials: 'MS'
    },
    {
      name: 'Thomas Weber',
      location: 'Augsburg',
      rating: 5,
      text: 'Die wöchentliche Büroreinigung ist immer pünktlich und gründlich. Sehr zuverlässiger Service!',
      initials: 'TW'
    },
    {
      name: 'Dr. Andrea Müller',
      location: 'Nürnberg',
      rating: 5,
      text: 'Der Transport unseres neuen Konferenztisches war perfekt. Das Team war sehr vorsichtig und professionell.',
      initials: 'AM'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <Hero />

      {/* Services Section */}
      <ParallaxSection speed={0.1}>
        <section ref={servicesRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                Unsere Top-Leistungen
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Professionelle Dienstleistungen für Privat- und Geschäftskunden
              </motion.p>
            </div>

            {loadingServices ? (
              <div className="text-center text-gray-600">Services werden geladen...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    icon={getIconComponent(service.icon)}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    imageUrl={service.image_url}
                    price={service.price}
                    popular={service.popular}
                  />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link to="/leistungen">Alle Leistungen entdecken</Link>
              </Button>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              ✅ Ihre Vorteile
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Warum Nikolai Transport?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Wir bieten Ihnen nicht nur Dienstleistungen, sondern echte Lösungen mit Mehrwert.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <advantage.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program Teaser Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                🎁 Empfehlen & Belohnt werden
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Teilen Sie Ihre Begeisterung und profitieren Sie!
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Sind Sie zufrieden mit unserem Service? Dann erzählen Sie es weiter! 
                Mit unserem Empfehlungsprogramm belohnen wir Sie und Ihre Freunde für jedes erfolgreiche Projekt. 
                Eine Win-Win-Situation für alle!
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                <Link to="/empfehlungsprogramm">Mehr über das Programm erfahren</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/referral-program.jpg"
                  alt="Freunde teilen eine Empfehlung"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                  <Gift className="h-20 w-20 text-white opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              ⚙️ Unser Prozess
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              So arbeiten wir – Schritt für Schritt
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transparenz und Effizienz in jedem Schritt Ihrer Dienstleistung
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Teaser Section */}
      <ParallaxSection speed={0.05}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  📖 Unsere Geschichte
                </div>
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Ihr vertrauensvoller Partner seit 2014
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Was 2014 als kleines Familienunternehmen begann, hat sich zu einem 
                  der führenden Dienstleister in der Region entwickelt. Wir stehen 
                  für Zuverlässigkeit, Qualität und einen Service, der von Herzen kommt. 
                  Unser engagiertes Team arbeitet täglich daran, Ihre Erwartungen zu übertreffen.
                </p>
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Link to="/ueber-uns">Mehr über uns erfahren</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img 
                  src="https://edcuorkphchuobrfqvyb.supabase.co/storage/v1/object/public/public_assets/about-us-teaser.jpg"
                  alt="Nikolai Müller, Gründer"
                  className="w-full h-96 object-cover rounded-xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Testimonials Section */}
      <ParallaxSection speed={0.08}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                Was unsere Kunden sagen
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Echte Bewertungen von echten Kunden
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="mr-4">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <Quote className="h-6 w-6 text-gray-300 mb-2" />
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link to="/bewertungen">Alle Bewertungen lesen</Link>
              </Button>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Bereit für Ihren Service?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/kontakt">Jetzt anfragen</Link>
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

export default Index;