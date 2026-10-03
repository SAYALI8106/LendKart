import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Repeat } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-28 border-t border-[#23352D] bg-[#0A1310] text-slate-300 relative overflow-hidden">
      {/* Subtle organic ambient tone */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C96F52]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-[#0F4C3A] flex items-center justify-center text-white shadow-forest-glow">
                <Repeat className="w-4.5 h-4.5 text-emerald-200" />
              </div>
              <span className="text-xl font-bold font-display text-white">LendKart</span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Why buy something you only need for a few hours or a weekend? LendKart empowers local communities to share high-grade cameras, 4K projectors, power tools, and outdoor equipment securely.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Lenders</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <MapPin className="w-4 h-4 text-brand-secondary" />
                <span>Pan-India Sharing</span>
              </div>
            </div>
          </div>

          {/* Column 1: LendKart */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4 font-display">
              LendKart
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/rent/projector" className="text-brand-accent hover:text-brand-accentHover font-bold transition-colors">
                  Rent Projectors (Special Page)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Marketplace */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4 font-display">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Explore All Gear
                </Link>
              </li>
              <li>
                <Link to="/explore?category=electronics" className="hover:text-white transition-colors">
                  Rent Electronics
                </Link>
              </li>
              <li>
                <Link to="/explore?category=photography" className="hover:text-white transition-colors">
                  Cameras & Photography
                </Link>
              </li>
              <li>
                <Link to="/list-item" className="hover:text-white transition-colors">
                  List Your Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4 font-display">
              Trust & Security
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Community Safety Standards
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  100% Security Deposit Protection
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Rental Agreement Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-cta flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-950/80 via-[#142620] to-[#1C2E28] mb-10 shadow-soft-md">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-300 mb-1">Keep useful things moving</p>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">Your spare gear could fund your next adventure.</h3>
          </div>
          <Link to="/list-item" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-emerald-600 text-white text-xs font-extrabold hover:scale-105 transition-all shadow-forest-glow">
            List your gear now
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© 2026 LendKart Technologies Inc. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Built for conscious, sustainable community consumption</span>
            <Heart className="w-3.5 h-3.5 text-brand-accent fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
