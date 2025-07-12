import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Sprout, Sparkles, Trash2, Star, Quote, Users2, Award, ThumbsUp, Clock, Phone, FileText, Wrench, CheckCircle2, HeartHandshake, ShieldCheck, BadgeEuro, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMedia } from '@/hooks/useMedia';

const Index = () => {
  const { media: referralProgramImage } = useMedia({ title: 'Referral Program Teaser', type: 'image' });
  const { media: aboutUsImage } = useMedia({ title: 'About Us Teaser', type: 'image' });

  const serviceCategories = [
    {
      icon: Truck,
      title: 'Transporte & Umzüge',
      description: 'Ob Umzug, Möbeltransport oder wichtige Lieferung – wir bringen Ihre Güter sicher, pünktlich und mit größter Sorgfalt ans Ziel.',
      link: '/leistungen/transporte',
      colorClass: 'from-blue-500 to-blue-700',
    },
    {
      icon: Sprout,
      title: 'Garten- & Landschaftsbau',
      description: 'Wir verwandeln Ihren Garten in eine Wohlfühloase. Von der Pflege bis zur Neugestaltung – Ihr grüner Traum ist unser Auftrag.',
      link: '/leistungen/garten-landschaftsbau',
      colorClass: 'from-green-500 to-emerald-700',
    },
    {
      icon: Sparkles,
      title: 'Gebäudereinigung',
      description: 'Makellose Sauberkeit für Ihr Zuhause oder Büro. Wir sorgen für glänzende Ergebnisse, damit Sie sich auf das Wesentliche konzentrieren können.',
      link: '/leistungen/reinigung',
      colorClass: 'from-purple-500 to-indigo-700',
    },
    {
      icon: Trash2,
      title: 'Entsorgung & Entrümpelung',
      description: 'Platz für Neues schaffen. Wir kümmern uns um die schnelle, fachgerechte und umweltfreundliche Entsorgung von allem, was Sie nicht mehr brauchen.',
      link: '/leistungen/entsorgung',
      colorClass: 'from-orange-500 to-red-700',
    }
  ];

  const stats = [
    { value: '10+', label: 'Jahre Erfahrung', icon: Award },
    { value: '500+', label: 'Zufriedene Kunden', icon: Users2 },
    { value: '98%', label: 'Weiterempfehlung', icon: ThumbsUp },
    { value: '24/7', label: 'Erreichbarkeit', icon: Clock }
  ];

  const advantages = [
    {
      icon: Clock,
      title: 'Pünktlichkeit & Zuverlässigkeit',
      description: 'Wir halten, was wir versprechen. Ihre Zeit ist wertvoll, deshalb sind wir immer pünktlich und arbeiten effizient.'
    },
    {
      icon: BadgeEuro,
      title: 'Transparente Preise',
      description: 'Keine versteckten Kosten. Sie erhalten von uns ein faires und klares Angebot, auf das Sie sich verlassen können.'
    },
    {
      icon: ShieldCheck,
      title: 'Qualität & Sorgfalt',
      description: 'Wir behandeln Ihr Eigentum wie unser eigenes. Modernste Ausrüstung und geschultes Personal garantieren beste Ergebnisse.'
    },
    {
      icon: HeartHandshake,
      title: 'Persönlicher Service',
      description: 'Ihre Zufriedenheit ist unser Antrieb. Wir hören Ihnen zu und finden für jedes Anliegen die perfekte Lösung.'
    }
  ];

  const howItWorksSteps = [
    {
      icon: Phone,
      title: '1. Anfrage & Beratung',
      description: 'Kontaktieren Sie uns unverbindlich. Wir besprechen Ihr Vorhaben und beraten Sie kostenlos.'
    },
    {
      icon: FileText,
      title: '2. Angebot & Planung',
      description: 'Sie erhalten ein transparentes Angebot. Gemeinsam planen wir alle Details für einen reibungslosen Ablauf.'
    },
    {
      icon: Wrench,
      title: '3. Durchführung',
      description: 'Unser Team führt den Auftrag pünktlich, professionell und mit höchster Sorgfalt für Sie aus.'
    },
    {
      icon: CheckCircle2,
      title: '4. Ergebnis',
      description: 'Wir übergeben Ihnen ein perfektes Ergebnis und freuen uns über Ihre Zufriedenheit.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria S.',
      location: 'Gelsenkirchen',
      rating: 5,
      text: 'Der Umzug mit Stotta Transport war eine riesige Erleichterung. Super pünktlich, unglaublich freundlich und alles kam heil an. Absolute Empfehlung!',
      initials: 'MS'
    },
    {
      name: 'Familie Weber',
      location: 'Essen',
      rating: 5,
      text: 'Unser Garten sah noch nie so gut aus! Das Team hat unsere Wünsche perfekt umgesetzt. Endlich eine Firma, die mitdenkt und zuverlässig ist.',
      initials: 'FW'
    },
    {
      name: 'Dr. Klaus M.',
      location: 'Bochum',
      rating: 5,
      text: 'Die regelmäßige Büroreinigung ist jeden Cent wert. Unsere Räume sind immer makellos sauber. Ein sehr professioneller und diskreter Service.',
      initials: 'KM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main>
        <Hero />

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl font-extrabold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Unsere Dienstleistungen
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ein Partner für alle Fälle. Wir bieten umfassende Lösungen für Privat- und Geschäftskunden.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex flex-col"
                >
                  <Card className="bg-gray-100/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex-grow flex flex-col">
                    <CardContent className="p-8 flex-grow flex flex-col">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.colorClass} flex items-center justify-center mb-6 shadow-lg`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{category.title}</h3>
                      <p className="text-gray-700 flex-grow mb-6">{category.description}</p>
                      <Button asChild variant="link" className="p-0 text-primary font-semibold hover:text-blue-800 self-start">
                        <Link to={category.link}>Mehr erfahren &rarr;</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-extrabold mb-1">{stat.value}</div>
                  <div className="text-lg text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl font-extrabold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Warum Stotta Transport?
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Wir bieten mehr als nur einen Service – wir bieten Ihnen Sorgenfreiheit.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center p-6"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <advantage.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{advantage.title}</h3>
                  <p className="text-gray-700">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl font-extrabold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                In 4 einfachen Schritten zum Erfolg
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Unser Prozess ist transparent, einfach und auf Ihre Bedürfnisse zugeschnitten.
              </motion.p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorksSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                      <step.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
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
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Echte Bewertungen von echten Kunden aus Ihrer Nachbarschaft.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                >
                  <Card className="h-full flex flex-col p-8 bg-gray-50 rounded-2xl shadow-sm border-gray-100">
                    <CardContent className="p-0 flex-grow flex flex-col">
                      <Quote className="h-8 w-8 text-blue-200 mb-4" />
                      <p className="text-gray-700 italic text-lg leading-relaxed flex-grow">"{testimonial.text}"</p>
                      <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
                        <Avatar className="mr-4 w-12 h-12">
                          <AvatarFallback className="bg-blue-100 text-primary text-xl font-bold">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-accent text-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Bereit, Ihr Projekt zu starten?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Lassen Sie uns gemeinsam Großes bewegen. Kontaktieren Sie uns jetzt für ein kostenloses und unverbindliches Angebot.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-full px-10 py-6 shadow-xl font-semibold text-lg" asChild>
                <Link to="/kontakt">Kostenlos anfragen</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-10 py-6 shadow-xl font-semibold text-lg" asChild>
                <a href="tel:+49123456789">Direkt anrufen</a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;