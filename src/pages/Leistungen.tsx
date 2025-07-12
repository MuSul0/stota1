import { Truck, Sprout, Sparkles, Trash2, ShieldCheck, ThumbsUp, BadgeEuro } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Leistungen = () => {
  const serviceCategories = [
    {
      icon: Truck,
      title: 'Transporte & Umzüge',
      description: 'Sicherer und pünktlicher Transport Ihrer Güter – von empfindlichen Hightech-Waren bis zu kompletten Umzügen für Privat- und Firmenkunden.',
      link: '/leistungen/transporte',
      colorClass: 'from-blue-500 to-blue-700',
      iconColor: 'text-primary',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Sprout,
      title: 'Garten- & Landschaftsbau',
      description: 'Von der regelmäßigen Gartenpflege über den Heckenschnitt bis hin zur kompletten Neugestaltung Ihrer Außenanlagen – wir schaffen grüne Oasen.',
      link: '/leistungen/garten-landschaftsbau',
      colorClass: 'from-green-500 to-emerald-700',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Sparkles,
      title: 'Gebäudereinigung',
      description: 'Professionelle Reinigungsdienste für Privat- und Gewerbekunden. Von der Grundreinigung bis zur Fahrzeugaufbereitung – wir sorgen für makellose Sauberkeit.',
      link: '/leistungen/reinigung',
      colorClass: 'from-purple-500 to-indigo-700',
      iconColor: 'text-accent',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Trash2,
      title: 'Entsorgung & Entrümpelung',
      description: 'Wir kümmern uns um die fachgerechte Entsorgung Ihrer alten Möbel, Elektrogeräte und Abfälle – schnell, zuverlässig und umweltbewusst.',
      link: '/leistungen/entsorgung',
      colorClass: 'from-orange-500 to-red-700',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: 'Garantierte Qualität',
      description: 'Wir setzen auf geschultes Personal und modernste Ausrüstung, um bei jedem Auftrag erstklassige Ergebnisse zu liefern.'
    },
    {
      icon: ThumbsUp,
      title: 'Absolute Zuverlässigkeit',
      description: 'Pünktlichkeit und die Einhaltung von Absprachen sind für uns selbstverständlich. Auf uns können Sie sich verlassen.'
    },
    {
      icon: BadgeEuro,
      title: 'Faire & Transparente Preise',
      description: 'Sie erhalten von uns klare und verständliche Angebote ohne versteckte Kosten. 100% fair und nachvollziehbar.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-28 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Unsere Leistungen
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Entdecken Sie unser breites Spektrum an professionellen Dienstleistungen. Wir bieten maßgeschneiderte Lösungen für Privat- und Geschäftskunden.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={category.link} className="block h-full">
                  <Card className="h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 flex flex-col md:flex-row items-center overflow-hidden border-transparent hover:border-primary/50 border-2">
                    <div className={`w-full md:w-48 h-48 md:h-full flex items-center justify-center flex-shrink-0 ${category.bgColor}`}>
                      <category.icon className={`w-20 h-20 ${category.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{category.title}</CardTitle>
                      <CardContent className="p-0 text-gray-700 text-lg leading-relaxed">
                        {category.description}
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
              Ihr Vorteil mit Stotta Transport
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wir kombinieren Erfahrung mit Leidenschaft, um Ihnen den besten Service zu bieten.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {whyChooseUs.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center p-6"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <advantage.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{advantage.title}</h3>
                <p className="text-gray-700">{advantage.description}</p>
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
            Haben Sie ein Projekt für uns?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Wir freuen uns darauf, von Ihnen zu hören. Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-full px-10 py-6 shadow-xl font-semibold text-lg" asChild>
              <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-10 py-6 shadow-xl font-semibold text-lg" asChild>
              <a href="tel:+49123456789">Direkt anrufen</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leistungen;