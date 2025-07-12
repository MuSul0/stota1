import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/LoginButton';
import { useSession } from '@/components/SessionProvider'; // Importiere useSession

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, user } = useSession(); // Nutze den useSession Hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Startseite', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: 'Über uns', path: '/ueber-uns' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Empfehlungsprogramm', path: '/empfehlungsprogramm' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  // Bestimme den Text und Pfad basierend auf der Benutzerrolle
  let dashboardLink = null;
  if (session && user) {
    let dashboardPath = '/kundenportal'; // Standard für Kunden
    let dashboardText = 'Kundenportal';

    if (user.role === 'admin') {
      dashboardPath = '/adminportal';
      dashboardText = 'Adminportal';
    } else if (user.role === 'mitarbeiter') {
      dashboardPath = '/mitarbeiterportal';
      dashboardText = 'Mitarbeiterportal';
    }

    dashboardLink = (
      <Button asChild variant="outline" className="text-gray-800 border-gray-300 hover:bg-gray-100">
        <Link to={dashboardPath}>
          {dashboardText}
        </Link>
      </Button>
    );
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              {dashboardLink} {/* Rollenbasierter Link */}
              <LoginButton /> {/* Login/Logout Button */}
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link to="/kontakt">Jetzt anfragen</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-800"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-gray-800 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 items-start">
              {session && user && (
                <Button asChild variant="outline" className="w-fit text-gray-800 border-gray-300 hover:bg-gray-100">
                  <Link to={
                    user.role === 'admin' ? '/adminportal' :
                    user.role === 'mitarbeiter' ? '/mitarbeiterportal' :
                    '/kundenportal'
                  } onClick={() => setIsMenuOpen(false)}>
                    {
                      user.role === 'admin' ? 'Adminportal' :
                      user.role === 'mitarbeiter' ? 'Mitarbeiterportal' :
                      'Kundenportal'
                    }
                  </Link>
                </Button>
              )}
              <div onClick={() => setIsMenuOpen(false)}>
                <LoginButton />
              </div>
              <Button asChild className="w-fit bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link to="/kontakt" onClick={() => setIsMenuOpen(false)}>
                  Jetzt anfragen
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;