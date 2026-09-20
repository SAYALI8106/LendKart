import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5 shadow-neon-glow">
                <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-display">
                    LK
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold font-display text-white">LendKart</span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Why buy something you only need for a few hours or a few days? LendKart connects local communities to share high-grade tech, cameras, power tools, and outdoor equipment.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Lenders</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-secondary" />
                <span>Pan-India Sharing</span>
              </div>
            </div>
          </div>

          {/* Column 1: LendKart */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              LendKart
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/rent/projector" className="hover:text-white transition-colors">
                  Rent Projectors (Google Ads)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
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
                  Cameras & Lenses
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Community Safety & Rules
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Security Deposit Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 LendKart Technologies Inc. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Crafted for sustainable community consumption</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
