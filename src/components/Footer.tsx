import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-1 lg:col-span-1">
            <Logo monochrome={true} />
            <p className="text-slate-400 text-sm mt-4 mb-4 leading-relaxed">
              Ihr zuverlässiger Partner für Reinigung, Transport und Umzugshilfe. 
              Stark im Service, schnell im Einsatz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Schnellzugriff</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors text-sm">Startseite</Link></li>
              <li><Link to="/ueber-uns" className="text-slate-400 hover:text-primary transition-colors text-sm">Über uns</Link></li>
              <li><Link to="/leistungen" className="text-slate-400 hover:text-primary transition-colors text-sm">Leistungen</Link></li>
              <li><Link to="/galerie" className="text-slate-400 hover:text-primary transition-colors text-sm">Galerie</Link></li>
              <li><Link to="/kontakt" className="text-slate-400 hover:text-primary transition-colors text-sm">Kontakt</Link></li>
              <li><Link to="/empfehlungsprogramm" className="text-slate-400 hover:text-primary transition-colors text-sm">Empfehlungsprogramm</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Unsere Leistungen</h4>
            <ul className="space-y-2">
              <li><Link to="/leistungen/transporte" className="text-slate-400 hover:text-primary transition-colors text-sm">Transporte</Link></li>
              <li><Link to="/leistungen/garten-landschaftsbau" className="text-slate-400 hover:text-primary transition-colors text-sm">Garten- & Landschaftsbau</Link></li>
              <li><Link to="/leistungen/reinigung" className="text-slate-400 hover:text-primary transition-colors text-sm">Reinigung</Link></li>
              <li><Link to="/leistungen/entsorgung" className="text-slate-400 hover:text-primary transition-colors text-sm">Entsorgung</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-slate-300 text-sm">+49 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-slate-300 text-sm">info@stotta-transport.de</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-slate-300 text-sm">Schalker Str. 143<br />45881 Gelsenkirchen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-xs">
            © 2024 Stotta Transport. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/impressum" className="text-slate-500 hover:text-primary text-xs transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-slate-500 hover:text-primary text-xs transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;