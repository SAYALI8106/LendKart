import React from 'react';
import { Camera, Tv, Wrench, Gamepad2, Headphones, Tent, Sparkles, ShieldCheck, MapPin } from 'lucide-react';

export const FallbackHero2D = () => {
  return (
    <div className="relative w-full h-[460px] lg:h-[540px] flex items-center justify-center overflow-hidden select-none">
      {/* Soft natural ambient tone */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-emerald-100/60 dark:bg-emerald-950/20 blur-3xl pointer-events-none" />
      <div className="absolute w-[360px] h-[360px] rounded-full bg-orange-100/50 dark:bg-orange-950/20 blur-3xl pointer-events-none" />

      {/* Central Editorial Hardware & Gear Hub */}
      <div className="relative z-10 bg-white dark:bg-[#14211D] p-8 rounded-3xl border border-[#E7E2D6] dark:border-white/10 shadow-soft-lg flex flex-col items-center max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-forest-glow mb-4">
          <Tv className="w-8 h-8 text-emerald-100" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primaryLight text-brand-primary border border-brand-primary/20 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified Local Gear
        </span>
        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1.5">
          Community Sharing Hub
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          High-end cameras, 4K projectors, power drills & gaming consoles available within 5 km of you.
        </p>
      </div>

      {/* Floating Gear Badges with Natural Palette */}
      <div className="absolute top-8 left-6 sm:left-12 bg-white dark:bg-[#192924] p-3 rounded-2xl border border-[#E7E2D6] dark:border-white/10 flex items-center gap-3 shadow-soft-md animate-float-slow">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-brand-primary dark:text-emerald-300 flex items-center justify-center">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">Sony A7 IV</div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">₹1,200/day • Available</div>
        </div>
      </div>

      <div className="absolute bottom-12 left-4 sm:left-10 bg-white dark:bg-[#192924] p-3 rounded-2xl border border-[#E7E2D6] dark:border-white/10 flex items-center gap-3 shadow-soft-md animate-float-slow" style={{ animationDelay: '1.8s' }}>
        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-brand-accent flex items-center justify-center">
          <Gamepad2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">PlayStation 5</div>
          <div className="text-[10px] text-brand-accent font-semibold">₹599/day • Pune</div>
        </div>
      </div>

      <div className="absolute top-12 right-6 sm:right-10 bg-white dark:bg-[#192924] p-3 rounded-2xl border border-[#E7E2D6] dark:border-white/10 flex items-center gap-3 shadow-soft-md animate-float-slow" style={{ animationDelay: '2.5s' }}>
        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 flex items-center justify-center">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">Bosch Cordless Drill</div>
          <div className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold">₹280/day • Verified</div>
        </div>
      </div>

      <div className="absolute bottom-10 right-8 sm:right-12 bg-white dark:bg-[#192924] p-3 rounded-2xl border border-[#E7E2D6] dark:border-white/10 flex items-center gap-3 shadow-soft-md animate-float-slow" style={{ animationDelay: '3.5s' }}>
        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center">
          <Tent className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 dark:text-white">Decathlon 4P Tent</div>
          <div className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">₹320/day • 4.9 ★</div>
        </div>
      </div>
    </div>
  );
};

export default FallbackHero2D;
