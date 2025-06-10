import { Truck, Sparkles, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <motion.div 
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {/* Logo Symbol */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <Truck className="h-6 w-6 text-white" />
          </div>
          
          {/* Dekorative Elemente */}
          <motion.div 
            className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        </div>

        {/* Textteil */}
        <div className="ml-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-800 to-blue-600 bg-clip-text text-transparent">
            Nikolai Transport
          </h1>
          <p className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
            Reinigung • Transport • Umzug
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;