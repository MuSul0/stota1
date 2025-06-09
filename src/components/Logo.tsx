import React from 'react';
import { Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
      <Truck className="h-8 w-8 text-blue-600" />
      <span className="text-2xl font-bold">Nikolai Transport</span>
    </Link>
  );
};

export default Logo;