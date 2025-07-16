import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Stota Transport</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Ihr zuverlässiger Partner für Reinigung, Transport und Umzugshilfe. 
              Stark im Service, schnell im Einsatz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Startseite</Link></li>
              <li><Link to="/ueber-uns" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Über uns</Link></li>
              <li><Link to="/leistungen" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Leistungen</Link></li>
              <li><Link to="/galerie" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Galerie</Link></li>
              <li><Link to="/kontakt" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Kontakt</Link></li>
              <li><Link to="/empfehlungsprogramm" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Empfehlungsprogramm</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Unsere Leistungen</h4>
            <ul className="space-y-2">
              <li><Link to="/leistungen/transporte" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Transporte</Link></li>
              <li><Link to="/leistungen/garten-landschaftsbau" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Garten- & Landschaftsbau</Link></li>
              <li><Link to="/leistungen/reinigung" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Reinigung</Link></li>
              <li><Link to="/leistungen/entsorgung" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Entsorgung</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">0209-88339457</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">kontakt@info-stota.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">Schalker Str. 143<br />45881 Gelsenkirchen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            © 2024 Stota Transport. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/impressum" className="text-gray-400 hover:text-blue-400 text-xs transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-gray-400 hover:text-blue-400 text-xs transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;