import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMedia } from '@/hooks/useMedia';

const Hero = () => {
  const { media: heroBackground, loading: loadingHeroBackground, error: heroError } = useMedia({ title: 'Hero Background', type: 'image' });

  if (loadingHeroBackground) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent"></div>
        <p className="text-white text-lg z-10">Lade Inhalte...</p>
      </div>
    );
  }

  if (heroError) {
    console.error("Fehler beim Laden des Hero-Hintergrundbilds:", heroError);
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground?.url || "https://via.placeholder.com/1920x1080?text=Stotta+Transport"}
          alt="Professionelle Umzugshelfer transportieren Kisten"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <motion.div 
            className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-400/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-blue-200 text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              Ihr 5-Sterne-Dienstleister
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Ihr zuverlässiger Partner für Transport, Reinigung & mehr.
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Professionell, pünktlich und mit Herz bei der Sache. Wir machen Ihren Alltag einfacher.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg" asChild>
              <Link to="/kontakt">
                Jetzt kostenlos anfragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-900 transition-all duration-200 px-8 py-6 text-lg" asChild>
              <Link to="/leistungen">
                Unsere Leistungen
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-8 text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-base font-medium">Qualität & Sorgfalt</span>
            </div>
            <div className="flex items-center space-x-3">
              <ThumbsUp className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-base font-medium">Top-Kundenzufriedenheit</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-base font-medium">Faire & transparente Preise</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;