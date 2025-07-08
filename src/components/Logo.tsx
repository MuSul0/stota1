import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group select-none">
      <motion.div 
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Truck className="h-7 w-7 text-white drop-shadow-md" />
      </motion.div>
      <div className="flex flex-col leading-tight">
        <motion.h1 
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 group-hover:from-purple-800 group-hover:to-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Nikolai
        </motion.h1>
        <motion.p 
          className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Reinigung • Transport • Umzug
        </motion.p>
      </div>
    </Link>
  );
};

export default Logo;