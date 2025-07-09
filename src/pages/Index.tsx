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

  // Hilfskomponente für einzelne Service-Karte
  const ServiceCard = ({ category }: { category: typeof serviceCategories[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col mb-8"
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
  );

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

            {/* 2 Spalten: links 2 Karten übereinander, rechts 2 Karten übereinander */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="flex flex-col">
                <ServiceCard category={serviceCategories[0]} />
                <ServiceCard category={serviceCategories[1]} />
              </div>
              <div className="flex flex-col">
                <ServiceCard category={serviceCategories[2]} />
                <ServiceCard category={serviceCategories[3]} />
              </div>
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