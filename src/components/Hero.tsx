import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMedia } from '@/hooks/useMedia';

const floatingVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Hero = () => {
  const { media: heroBackground, loading: loadingHeroBackground, error } = useMedia({ title: 'Startseite Hero Background', pageContext: 'startseite' });

  if (loadingHeroBackground) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Hero-Sektion...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">Ein Fehler ist aufgetreten</h2>
          <p className="text-red-700">Die Inhalte für diesen Bereich konnten nicht geladen werden.</p>
          <p className="text-sm text-red-600 mt-2">Fehlerdetails: {error}</p>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Mögliche Ursache:</strong> Dies passiert oft, wenn die Webseite die Datenbank nicht erreichen kann. 
            Bitte überprüfen Sie, ob die Supabase-Umgebungsvariablen (VITE_SUPABASE_URL und VITE_SUPABASE_KEY) 
            in Ihrer Hosting-Umgebung korrekt konfiguriert sind.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Floating Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 0.5 }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground?.url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} // Fallback image
          alt="Professionelle Umzugshelfer beim Transport"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.div 
              className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-blue-200 text-sm font-medium">✨ Über 10 Jahre Erfahrung</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Stark im Service,<br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                schnell im Einsatz
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Ihr zuverlässiger Partner für Reinigung, Transport und Umzugshilfe. 
              Professionell, pünktlich und mit Herz bei der Sache.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200" asChild>
                <Link to="/kontakt">
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-900 transition-all duration-200" asChild>
                <Link to="/leistungen">
                  <Play className="mr-2 h-5 w-5" />
                  Unsere Leistungen
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">500+ Zufriedene Kunden</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">24/7 Erreichbar</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">Faire Preise</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Contact Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 transform transition-all duration-500 hover:rotate-1 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Direkt Kontakt aufnehmen</h3>
              <p className="text-gray-600 mb-6">
                Wir sind für Sie da! Kontaktieren Sie uns für ein unverbindliches Angebot oder bei Fragen.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <a href="tel:+49123456789" className="text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors">+49 123 456 789</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <a href="mailto:kontakt@info-stota.de" className="text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors">kontakt@info-stota.de</a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span className="text-lg text-gray-700">Schalker Str. 143, 45881 Gelsenkirchen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <span className="text-lg text-gray-700">Mo-Fr: 7:00 - 18:00 Uhr</span>
                </div>
              </div>
              <Button asChild className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link to="/kontakt">Zum Kontaktformular</Link>
              </Button>
            </div>

            {/* 3D Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.25, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scrollen Sie nach unten</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;