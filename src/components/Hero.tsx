import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const floatingVariants: Variants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};