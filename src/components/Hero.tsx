import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Stark im Service,<br />
              <span className="text-blue-200">schnell im Einsatz</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Ihr zuverlässiger Partner für Reinigung, Transport und Umzugshilfe. 
              Professionell, pünktlich und mit Herz bei der Sache.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/kontakt">
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/leistungen">Unsere Leistungen</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Zuverlässig</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Professionell</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Fair & Transparent</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Sofort-Kontakt</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                  <span>Telefon:</span>
                  <a href="tel:+49123456789" className="font-semibold hover:text-blue-200">
                    +49 123 456 789
                  </a>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                  <span>WhatsApp:</span>
                  <a href="https://wa.me/49123456789" className="font-semibold hover:text-blue-200">
                    Nachricht senden
                  </a>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                  <span>E-Mail:</span>
                  <a href="mailto:info@nikolai-transport.de" className="font-semibold hover:text-blue-200">
                    info@nikolai-transport.de
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;