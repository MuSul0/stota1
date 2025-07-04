import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hero-section"
    >
      {/* Hero content goes here */}
    </motion.div>
  );
}