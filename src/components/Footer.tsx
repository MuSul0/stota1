import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Nikolai Transport</h3>
            <p className="text-gray-300 mb-4">
              Ihr zuverlässiger Partner für Reinigung, Transport und Umzugshilfe. 
              Stark im Service, schnell im Einsatz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Startseite</Link></li>
              <li><Link to="/ueber-uns" className="text-gray-300 hover:text-blue-400 transition-colors">Über uns</Link></li>
              <li><Link to="/leistungen" className="text-gray-300 hover:text-blue-400 transition-colors">Leistungen</Link></li>
              <li><Link to="/galerie" className="text-gray-300 hover:text-blue-400 transition-colors">Galerie</Link></li>
              <li><Link to="/kontakt" className="text-gray-300 hover:text-blue-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Unsere Leistungen</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Gebäudereinigung</li>
              <li className="text-gray-300">Privatreinigung</li>
              <li className="text-gray-300">Transport & Kurier</li>
              <li className="text-gray-300">Umzugshilfe</li>
              <li className="text-gray-300">Möbelmontage</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+49 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@nikolai-transport.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Musterstraße 123<br />12345 Musterstadt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Nikolai Transport. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/impressum" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;