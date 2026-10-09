import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: 'blur(4px)'
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1], // Custom apple-style spring ease
      staggerChildren: 0.08
    }
  },
  out: {
    opacity: 0,
    scale: 1.03,
    y: -16,
    filter: 'blur(3px)',
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="w-full will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
