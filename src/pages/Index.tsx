import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Truck, Leaf, Sparkles, Star, Quote, Users, Lightbulb, Handshake, Briefcase, Smile, Euro, PhoneCall, CalendarCheck, Wrench, ThumbsUp, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMedia } from '@/hooks/useMedia';

const Index = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  const { media: referralProgramImage, loading: loadingReferralProgramImage, error: referralError } = useMedia({ title: 'Referral Program Teaser', type: 'image' });
  const { media: aboutUsImage, loading: loadingAboutUsImage, error: aboutUsError } = useMedia({ title: 'About Us Teaser', type: 'image' });

  const serviceCategories = [
    {
      icon: Truck,
      title: 'Transporte',
      subtitle: 'Ihre Güter sicher ans Ziel',
      description: 'Sicherer und pünktlicher Transport Ihrer Güter – von empfindlichen Hightech-Waren bis zu kompletten Umzügen für Privat- und Firmenkunden.',
      link: '/leistungen/transporte',
      colorClass: 'from-blue-600 to-blue-800',
    },
    {
      icon: Leaf,
      title: 'Garten- & Landschaftsbau',
      subtitle: 'Ihr Traumgarten – von der Idee zur Realität',
      description: 'Von der regelmäßigen Gartenpflege über Rasen mähen und Heckenschnitt bis hin zu Baumfällungen und der Neugestaltung Ihrer Außenanlagen.',
      link: '/leistungen/garten-landschaftsbau',
      colorClass: 'from-orange-600 to-red-800',
    },
    {
      icon: Sparkles,
      title: 'Reinigung',
      subtitle: 'Glanz & Hygiene für Ihr Zuhause & Geschäft',
      description: 'Professionelle Reinigungsdienste für Privat- und Gewerbekunden. Von der Grundreinigung bis zur Fahrzeugaufbereitung – wir sorgen für makellose Sauberkeit.',
      link: '/leistungen/reinigung',
      colorClass: 'from-purple-600 to-indigo-800',
    },
    {
      icon: Leaf,
      title: 'Entsorgung',
      subtitle: 'Sauber & Umweltgerecht entsorgen',
      description: 'Wir kümmern uns um die fachgerechte Entsorgung Ihrer alten Möbel, Elektrogeräte, Gartenabfälle und Renovierungsreste – schnell, zuverlässig und umweltbewusst.',
      link: '/leistungen/entsorgung',
      colorClass: 'from-green-600 to-emerald-800',
    }
  ];

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
      icon: Wrench,
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
      text: 'Stotta Transport hat unseren Umzug perfekt organisiert. Alles verlief reibungslos und die Mitarbeiter waren äußerst professionell.',
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
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />

      <Hero />

      {/* Services Section */}
      <ParallaxSection speed={0.1}>
        <section ref={servicesRef} className="py-20 bg-white rounded-3xl shadow-lg mx-6 md:mx-12 lg:mx-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl font-extrabold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Unsere Top-Leistungen
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Professionelle Dienstleistungen für Privat- und Geschäftskunden
              </motion.p>
            </div>

            {/* Hier 2 Spalten statt 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group cursor-pointer rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                  <div className={`w-full h-48 rounded-t-3xl bg-gradient-to-br ${category.colorClass} flex items-center justify-center text-white text-6xl drop-shadow-lg`}>
                    <category.icon className="w-16 h-16" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{category.title}</h3>
                    <p className="text-gray-700 flex-grow">{category.description}</p>
                    <Button asChild className={`mt-6 w-full bg-gradient-to-r ${category.colorClass} hover:from-opacity-90 hover:to-opacity-90 text-white rounded-xl shadow-md font-semibold text-lg`}>
                      <Link to={category.link}>Mehr erfahren</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Rest der Seite bleibt unverändert */}
      {/* ... */}
      <Footer />
    </div>
  );
};

export default Index;