import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <motion.div 
        className="flex items-center gap-2"
        whileHover={{ scale: 1.03 }}
      >
        {/* Symbol */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
          <Truck className="h-4 w-4 text-white" />
        </div>

        {/* Text */}
        <div className="leading-tight">
          <h1 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            Nikolai
          </h1>
          <p className="text-[11px] text-gray-500">
            Reinigung • Transport • Umzug
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;