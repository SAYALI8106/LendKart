import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

export const InteractiveHeroVisual = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate springs for buttery smooth parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transform layers
  const centerRotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const centerRotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const layer2X = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [22, -22]);

  const layer3X = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center select-none perspective-[1400px] overflow-visible"
    >
      {/* Background Soft Ambient Light Cones */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-[#176B52]/25 blur-[90px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute w-[240px] h-[240px] -bottom-10 -right-6 rounded-full bg-[#C96F52]/20 blur-[75px]" />
        <div className="absolute w-[200px] h-[200px] -top-6 -left-6 rounded-full bg-[#86AFC4]/20 blur-[65px]" />
      </div>

      {/* 1. CENTERPIECE: 4K Laser Projector Showcase */}
      <motion.div
        style={{
          rotateX: centerRotateX,
          rotateY: centerRotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={() => navigate('/rent/projector')}
        data-cursor="RENT"
        className="relative z-20 cursor-pointer group"
      >
        <div className="relative w-[280px] sm:w-[330px] rounded-3xl p-3.5 bg-gradient-to-b from-white/20 via-white/10 to-white/5 dark:from-white/15 dark:to-white/5 backdrop-blur-xl border border-white/30 dark:border-white/20 shadow-[0_24px_50px_-12px_rgba(7,19,16,0.6)] group-hover:border-emerald-300/50 transition-all duration-500">
          {/* Simulated Projector Projection Beam Effect */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-t from-emerald-400/20 via-teal-300/10 to-transparent blur-md pointer-events-none rounded-t-full opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Projector Image with Glass Overlay */}
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=85"
              alt="4K Smart Laser Projector"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Live Active Lens Flare */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-extrabold tracking-wide backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>4K LASER</span>
            </div>

            {/* Price Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <div>
                <p className="text-[11px] font-semibold text-emerald-200">Epson EpiqVision Laser</p>
                <p className="text-xs font-bold flex items-center gap-1">
                  <span className="text-sm font-extrabold text-amber-300">₹450</span>
                  <span className="text-[10px] text-white/70">/ day</span>
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Center Badge below card */}
          <div className="mt-3 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-[11px] text-white">
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Instant 2-Hr Pickup
            </span>
            <span className="text-white/60">100" Screen Included</span>
          </div>
        </div>
      </motion.div>

      {/* 2. FLOATING ITEM TOP RIGHT: Sony Alpha A7 IV Camera Rig */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        onClick={() => navigate('/explore?category=photography')}
        data-cursor="RENT"
        className="absolute top-2 right-0 sm:right-6 lg:-right-4 z-30 cursor-pointer group"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-48 sm:w-56 p-2.5 rounded-2xl bg-white/15 dark:bg-[#14211D]/80 backdrop-blur-xl border border-white/25 dark:border-white/15 shadow-xl hover:scale-105 transition-all duration-300"
        >
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
              alt="Sony A7 IV Camera"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-extrabold uppercase">
              Cinema Rig
            </div>
          </div>
          <div className="pt-2 px-1 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white leading-tight">Sony A7 IV 4K</p>
              <p className="text-[11px] text-emerald-300 font-semibold">₹799 / day</p>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
              Pune
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. FLOATING ITEM BOTTOM LEFT: PlayStation 5 Console */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        onClick={() => navigate('/explore?category=gaming')}
        data-cursor="RENT"
        className="absolute bottom-2 left-0 sm:left-4 lg:-left-4 z-30 cursor-pointer group"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="w-44 sm:w-52 p-2.5 rounded-2xl bg-white/15 dark:bg-[#14211D]/80 backdrop-blur-xl border border-white/25 dark:border-white/15 shadow-xl hover:scale-105 transition-all duration-300"
        >
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80"
              alt="PS5 Gaming Console"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#C96F52] text-white text-[9px] font-extrabold uppercase">
              2 Controllers
            </div>
          </div>
          <div className="pt-2 px-1 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white leading-tight">PS5 DualSense Rig</p>
              <p className="text-[11px] text-amber-300 font-semibold">₹299 / day</p>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
              4K HDR
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 4. FLOATING ITEM TOP LEFT: Decathlon Weatherproof Tent */}
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        onClick={() => navigate('/explore?category=outdoor')}
        data-cursor="RENT"
        className="absolute top-4 left-4 sm:left-12 lg:left-2 z-10 cursor-pointer group hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="w-36 sm:w-44 p-2 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-lg hover:scale-105 transition-all duration-300"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
              alt="Camping Tent"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="pt-1.5 px-0.5 flex items-center justify-between text-white">
            <p className="text-[11px] font-bold truncate">4-Person Tent</p>
            <p className="text-[10px] text-emerald-300 font-bold">₹350/d</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 5. FLOATING ITEM BOTTOM RIGHT: Cordless Power Tool */}
      <motion.div
        style={{ x: layer1X, y: layer2Y }}
        onClick={() => navigate('/explore?category=tools')}
        data-cursor="RENT"
        className="absolute bottom-6 right-2 sm:right-10 lg:right-4 z-10 cursor-pointer group hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-36 sm:w-44 p-2 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-lg hover:scale-105 transition-all duration-300"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80"
              alt="Power Tools"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="pt-1.5 px-0.5 flex items-center justify-between text-white">
            <p className="text-[11px] font-bold truncate">Bosch 18V Drill</p>
            <p className="text-[10px] text-amber-300 font-bold">₹150/d</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveHeroVisual;
