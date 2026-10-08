import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, ArrowRight, Instagram, Twitter, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-32 border-t border-[#1E332B] bg-[#0A1310] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-[#176B52]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C96F52]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Massive Editorial Wordmark in Background */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="text-[14vw] font-black font-display tracking-tight text-white/[0.03] uppercase inline-block whitespace-nowrap">
          LendKart
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10 space-y-16">
        {/* Top Section: Brand Lockup & Newsletter / Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-2xl bg-[#176B52] flex items-center justify-center font-black font-display text-white text-lg shadow-forest-glow group-hover:scale-105 transition-transform">
                L
              </span>
              <span className="text-2xl font-black font-display tracking-tight text-white">
                LendKart<span className="text-[#C96F52]">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed font-normal">
              Don't buy it. Lend it. Discover verified 4K projectors, DSLR rigs, camping tents, and cordless power tools from trusted neighbors near you.
            </p>

            <div className="flex items-center gap-3 pt-2 text-white/60">
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white/5 to-[#176B52]/20 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                Circular Sharing
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Turn your idle gear into passive income.
              </h3>
              <p className="text-xs text-white/70">
                Earn ₹12,000+ per month listing your camera, projector, or tools.
              </p>
            </div>
            <Link
              to="/list-item"
              className="px-6 py-3 rounded-xl bg-[#176B52] hover:bg-[#125440] text-white font-bold text-xs shadow-forest-glow shrink-0 transition-all hover:scale-105"
            >
              List an Item
            </Link>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-4 font-display">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore All Gear</Link></li>
              <li><Link to="/rent/projector" className="text-amber-300 hover:text-amber-200 font-bold transition-colors">★ Rent 4K Projectors</Link></li>
              <li><Link to="/explore?category=photography" className="hover:text-white transition-colors">Cinema Cameras & Drones</Link></li>
              <li><Link to="/explore?category=gaming" className="hover:text-white transition-colors">PlayStation 5 Consoles</Link></li>
              <li><Link to="/explore?category=outdoor" className="hover:text-white transition-colors">Trekking & Camping Tents</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-4 font-display">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How Renting Works</Link></li>
              <li><Link to="/list-item" className="hover:text-white transition-colors">List Your Equipment</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Rental Guides & Journal</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-4 font-display">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /><span>100% ID Verified</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Escrow Deposit Protection</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Community Rental Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Damage Waiver Terms</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Notice</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-4 font-display">
              Connect & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>Pune, Mumbai & Bengaluru</span></li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><a href="mailto:support@lendkart.demo" className="hover:text-white">support@lendkart.demo</a></li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>+91 98230 11223</span></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support Team</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>© 2026 LendKart Technologies. Don't buy it. Lend it.</div>
          <div className="flex items-center gap-1.5">
            <span>Built for conscious, sustainable community consumption</span>
            <Heart className="w-3.5 h-3.5 text-[#C96F52] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
