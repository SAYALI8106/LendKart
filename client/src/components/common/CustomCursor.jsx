import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing circle
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch screens or mobile
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, input, select, textarea, .interactive-card, .clickable');
      if (!target) {
        setCursorVariant('default');
        setCursorText('');
        return;
      }

      const customText = target.getAttribute('data-cursor');
      if (customText) {
        setCursorVariant('text');
        setCursorText(customText);
      } else if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setCursorVariant('interactive');
        setCursorText('');
      } else {
        setCursorVariant('hover');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#176B52] dark:bg-[#A8C8B5]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorVariant === 'text' ? 0 : 5,
          height: cursorVariant === 'text' ? 0 : 5,
          opacity: cursorVariant === 'text' ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer Magnetic Follower Ring / Pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-bold font-display select-none backdrop-blur-xs"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'text' ? 84 : cursorVariant === 'interactive' ? 44 : 26,
          height: cursorVariant === 'text' ? 34 : cursorVariant === 'interactive' ? 44 : 26,
          borderRadius: cursorVariant === 'text' ? '20px' : '9999px',
          backgroundColor:
            cursorVariant === 'text'
              ? '#176B52'
              : cursorVariant === 'interactive'
              ? 'rgba(23, 107, 82, 0.12)'
              : 'rgba(23, 107, 82, 0.05)',
          borderColor:
            cursorVariant === 'text'
              ? 'rgba(255, 255, 255, 0.4)'
              : cursorVariant === 'interactive'
              ? '#176B52'
              : 'rgba(23, 107, 82, 0.35)',
          borderWidth: cursorVariant === 'text' ? '1px' : '1.5px',
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorVariant === 'text' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] tracking-[0.16em] uppercase text-white font-extrabold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
