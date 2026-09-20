import React from 'react';
import { Camera, Tv, Wrench, Gamepad2, Headphones, Tent, Sparkles } from 'lucide-react';

export const FallbackHero2D = () => {
  return (
    <div className="relative w-full h-[480px] lg:h-[580px] flex items-center justify-center overflow-hidden">
      {/* Dynamic ambient rings */}
      <div className="absolute w-96 h-96 rounded-full border border-brand-primary/20 animate-ping opacity-25" style={{ animationDuration: '4s' }} />
      <div className="absolute w-[460px] h-[460px] rounded-full border border-brand-secondary/20 animate-spin" style={{ animationDuration: '30s' }} />
      <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-brand-primary/20 via-brand-secondary/20 to-brand-accent/10 blur-3xl animate-pulse" />

      {/* Central Holographic Hub */}
      <div className="relative z-10 glass-panel p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col items-center max-w-sm text-center transform hover:scale-105 transition-transform duration-500">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary via-indigo-600 to-brand-secondary flex items-center justify-center text-white shadow-neon-glow mb-4">
          <Tv className="w-10 h-10 animate-bounce" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-accent/20 text-emerald-400 border border-brand-accent/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> 3D Ecosystem Active
        </span>
        <h3 className="text-xl font-bold font-display text-white mb-1">
          Community Rental Hub
        </h3>
        <p className="text-xs text-slate-400">
          High-end cameras, 4K projectors, power drills & gaming consoles available within 5 km of you.
        </p>
      </div>

      {/* Floating Gadget Badges */}
      <div className="absolute top-10 left-12 glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3 animate-float-slow shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">Sony A7 IV</div>
          <div className="text-[10px] text-emerald-400">₹1,200/day • Available</div>
        </div>
      </div>

      <div className="absolute bottom-16 left-8 glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3 animate-float-slow shadow-lg" style={{ animationDelay: '1.5s' }}>
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
          <Gamepad2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">PlayStation 5</div>
          <div className="text-[10px] text-brand-secondary">₹599/day • Pune</div>
        </div>
      </div>

      <div className="absolute top-16 right-10 glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3 animate-float-slow shadow-lg" style={{ animationDelay: '2.5s' }}>
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">Bosch Cordless Drill</div>
          <div className="text-[10px] text-emerald-400">₹280/day • Verified</div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3 animate-float-slow shadow-lg" style={{ animationDelay: '3.5s' }}>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <Tent className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">Decathlon 4P Tent</div>
          <div className="text-[10px] text-amber-400">₹320/day • 4.9 ★</div>
        </div>
      </div>
    </div>
  );
};

export default FallbackHero2D;
