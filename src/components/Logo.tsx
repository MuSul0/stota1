import React from 'react';
import { Truck, Sparkles, Home } from 'lucide-react'; // Importiere zusätzliche Icons
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
      <div className="flex items-center space-x-1">
        <Sparkles className="h-6 w-6 text-green-500" title="Reinigung" /> {/* Icon für Reinigung */}
        <Truck className="h-8 w-8 text-blue-600" title="Transport" /> {/* Icon für Transport */}
        <Home className="h-6 w-6 text-orange-500" title="Umzugshilfe" /> {/* Icon für Umzugshilfe */}
      </div>
      <span className="text-2xl font-bold">Nikolai Transport</span>
    </Link>
  );
};

export default Logo;