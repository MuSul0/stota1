import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      {/* Symbol */}
      <motion.div
        className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center"
        whileHover={{ rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Truck className="h-4 w-4 text-white" />
      </motion.div>

      {/* Text - kompakt und ausgewogen */}
      <div className="leading-tight">
        <h1 className="text-[15px] font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
          Nikolai Transport
        </h1>
        <p className="text-[11px] text-gray-500 tracking-tight">
          Reinigung • Transport • Umzug
        </p>
      </div>
    </Link>
  );
};

export default Logo;