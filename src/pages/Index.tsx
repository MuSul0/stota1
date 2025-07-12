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

  const { media: referralProgramImage, loading: loadingReferralProgramImage, error: referralError } = useMedia({ title: 'Referral Program Teaser' });
  const { media: aboutUsImage, loading: loadingAboutUsImage, error: aboutUsError } = useMedia({ title: 'About Us Teaser' });

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-extrabold mb-1">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-extrabold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ihre Vorteile bei Stotta Transport
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wir bieten Ihnen mehr als nur Dienstleistungen – wir bieten Qualität, Vertrauen und Service mit Herz.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center p-6 border rounded-3xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <advantage.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{advantage.title}</h3>
                <p className="text-gray-700">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-purple-100 text-purple-600 px-5 py-3 rounded-full text-base font-semibold mb-6">
                🎁 Empfehlen & Belohnt werden
              </div>
              <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
                Teilen Sie Ihre Begeisterung und profitieren Sie!
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Sind Sie zufrieden mit unserem Service? Dann erzählen Sie es weiter! 
                Mit unserem Empfehlungsprogramm belohnen wir Sie und Ihre Freunde für jedes erfolgreiche Projekt. 
                Eine Win-Win-Situation für alle!
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-10 py-4 shadow-lg font-semibold">
                <Link to="/empfehlungsprogramm">Mehr über das Programm erfahren</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src={referralProgramImage?.url || "https://placehold.co/600x400/e9d5ff/8b5cf6?text=Empfehlung"}
                alt="Freunde teilen eine Empfehlung"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                <Gift className="h-24 w-24 text-white opacity-90" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-purple-100 text-purple-600 px-5 py-3 rounded-full text-base font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ⚙️ Unser Prozess
            </motion.div>
            <motion.h2 
              className="text-4xl font-extrabold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              So arbeiten wir – Schritt für Schritt
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transparenz und Effizienz in jedem Schritt Ihrer Dienstleistung
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center p-6 border rounded-3xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Teaser Section */}
      <ParallaxSection speed={0.05}>
        <section className="py-20 bg-white rounded-3xl shadow-lg mx-6 md:mx-12 lg:mx-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-5 py-3 rounded-full text-base font-semibold mb-6">
                  📖 Unsere Geschichte
                </div>
                <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
                  Ihr vertrauensvoller Partner seit 2014
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Was 2014 als kleines Familienunternehmen begann, hat sich zu einem 
                  der führenden Dienstleister in der Region entwickelt. Wir stehen 
                  für Zuverlässigkeit, Qualität und einen Service, der von Herzen kommt. 
                  Unser engagiertes Team arbeitet täglich daran, Ihre Erwartungen zu übertreffen.
                </p>
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-10 py-4 shadow-lg font-semibold">
                  <Link to="/ueber-uns">Mehr über uns erfahren</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={aboutUsImage?.url || "https://placehold.co/600x400/dbeafe/2563eb?text=Über+Uns"}
                  alt="Stotta Müller vor seinem ersten Transporter im Jahr 2014"
                  className="w-full h-96 object-cover rounded-3xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-3xl">
                  <p className="text-white font-medium">Stotta Müller, 2014</p>
                  <p className="text-white/80 text-sm">Der Anfang einer Erfolgsgeschichte</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Testimonials Section */}
      <ParallaxSection speed={0.08}>
        <section className="py-20 bg-white rounded-3xl shadow-lg mx-6 md:mx-12 lg:mx-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl font-extrabold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Was unsere Kunden sagen
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Echte Bewertungen von echten Kunden
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="flex flex-col p-8 border rounded-3xl shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <Avatar className="mr-6 w-20 h-20">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl font-bold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600 text-lg">{testimonial.location}</p>
                      <div className="flex mt-2">{Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}</div>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-3xl shadow-lg mx-6 md:mx-12 lg:mx-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2 
            className="text-5xl font-extrabold mb-8 drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Bereit für Ihren Service?
          </motion.h2>
          <motion.p 
            className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot
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

export default Index;