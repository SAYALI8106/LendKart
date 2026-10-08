import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Tv,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Star,
  ArrowRight,
  ChevronDown,
  DollarSign,
  Calendar,
  Zap,
  Clock,
  Film,
  Trophy,
  Gamepad2,
  Briefcase
} from 'lucide-react';
import { itemService } from '../services/itemService';
import ItemCard from '../components/marketplace/ItemCard';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import { formatINR } from '../utils/formatters';

const FAQS = [
  {
    q: 'How does pickup and return work for projectors in my city?',
    a: 'Once you select your dates and the lender confirms your request, you can pick up the projector directly from their verified residential or office location, or coordinate doorstep delivery depending on the lender\'s options.'
  },
  {
    q: 'Do the rented projectors include HDMI cables, remotes, and power adapters?',
    a: 'Yes! All projectors listed on LendKart include genuine power cords, high-speed HDMI cables, and remote controls. Many lenders also offer 100-inch pull-up screens as add-ons.'
  },
  {
    q: 'How does the security deposit work?',
    a: 'Security deposits are held securely in escrow during your rental period. As soon as the projector is returned in original functional condition, the deposit is instantly released back to your original payment method.'
  },
  {
    q: 'Can I connect my PlayStation 5, Laptop, or Fire TV Stick to the projector?',
    a: 'Absolutely! Our listed models (Epson EpiqVision, BenQ 4K, ViewSonic) feature standard HDMI 2.0/2.1 ports, Bluetooth audio, and USB ports supporting laptops, consoles, and streaming sticks.'
  }
];

export const ProjectorLandingPage = () => {
  const [projectors, setProjectors] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchProjectors = async () => {
      try {
        const res = await itemService.getItems({ category: 'electronics', search: 'projector', limit: 4 });
        setProjectors(res.items || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjectors();
  }, []);

  return (
    <div className="space-y-24 sm:space-y-36 pb-16">
      <SEO
        title="Need a Projector? Don't Buy One — Rent from ₹450/day | LendKart Campaign"
        description="Hire 4K home cinema and laser projectors in Pune, Mumbai, Bengaluru for movie nights, sports screenings, and terrace parties. Save 90% on purchase costs."
      />

      {/* =========================================================================
          1. HIGH-CONVERSION CINEMATIC HERO (GOOGLE ADS MATCH)
          ========================================================================= */}
      <section className="relative mx-3 sm:mx-6 lg:mx-8 mt-2 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden bg-[#0A1310] text-white border border-white/10 shadow-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#176B52]/30 blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#C96F52]/25 blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 sm:px-10 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-emerald-300 backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span>Google Ads Special • Same-Day Pune & Mumbai Pickup</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.05] text-white">
                Need a Projector?{' '}
                <span className="text-emerald-300 block">Don't Buy One.</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Rent high-lumen 1080p and 4K laser projectors starting from just <span className="text-amber-300 font-bold">₹450/day</span>. Perfect for terrace movie nights, live cricket match screenings, presentations, and big-screen gaming.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  as={Link}
                  to="/explore?category=electronics&search=projector"
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto px-8 !bg-[#C96F52] hover:!bg-[#B55E42] text-white font-extrabold text-base shadow-lg hover:scale-105 transition-all"
                >
                  <span>Explore Projectors</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <div className="text-xs text-white/70 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Available for pickup in under 2 hours</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-medium text-white/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>HDMI & Power Cord Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100" Screen Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Purchase Regret</span>
                </div>
              </div>
            </div>

            {/* Right Cinematic Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=85"
                  alt="4K Laser Projector Home Theater"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider">Top Rated Gear</p>
                    <p className="text-sm font-bold">Epson EpiqVision Laser 4K</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-amber-300">₹450/day</p>
                    <p className="text-[10px] text-white/70">1000 ANSI Lumens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. USE CASES SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
            Built for Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            What Can You Rent a Projector For?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Film,
              title: 'Rooftop Movie Nights',
              desc: 'Transform your terrace or living room into an open-air cinema under the stars with 120-inch 1080p projection.',
              tag: 'Most Popular'
            },
            {
              icon: Trophy,
              title: 'Live Cricket Watch Parties',
              desc: 'Catch every boundary in 4K HDR with friends. Zero motion blur for fast-paced IPL and World Cup matches.',
              tag: 'Game Day'
            },
            {
              icon: Gamepad2,
              title: 'Console Gaming Tournaments',
              desc: 'Connect your PlayStation 5 or Xbox Series X with low 16ms input latency on massive display scale.',
              tag: '120 Hz Gaming'
            },
            {
              icon: Briefcase,
              title: 'Pitch Decks & Presentations',
              desc: 'Deliver crisp corporate keynote slides, college fest pitches, and workshops with high ANSI brightness.',
              tag: 'Professional'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 shadow-soft-sm hover:border-[#176B52]/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#176B52]/10 dark:bg-[#176B52]/20 text-[#176B52] dark:text-emerald-300 flex items-center justify-center font-bold">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7F4EC] dark:bg-black/40 text-slate-700 dark:text-slate-300 border border-[#E5E0D2] dark:border-white/10">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                {item.title}
              </h3>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED PROJECTORS SELECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
              Ready for Pickup
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
              Top Rated Projectors in Pune & Mumbai
            </h2>
          </div>
          <Link
            to="/explore?category=electronics&search=projector"
            className="text-xs font-bold text-[#176B52] dark:text-[#A8C8B5] flex items-center gap-1 hover:text-[#125440]"
          >
            <span>View All Projectors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {projectors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectors.map((item, idx) => (
              <ItemCard key={item._id} item={item} isFeatured={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10">
            <p className="text-xs text-slate-500">Loading projector listings...</p>
          </div>
        )}
      </section>

      {/* =========================================================================
          4. COST COMPARISON TABLE (BUY VS RENT)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-[#14211D] p-8 sm:p-12 rounded-[2.5rem] border border-[#E5E0D2] dark:border-white/10 shadow-soft-md space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C96F52] font-display">
              Financial Breakdown
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              The Math: Buying vs Renting
            </h3>
            <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
              Here is how much you actually save when renting for an event.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Option A: Buying
              </span>
              <div className="text-3xl font-extrabold font-display text-rose-600 dark:text-rose-400">
                ₹48,000
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>• Large upfront capital locked away</li>
                <li>• Used only 2–3 times per year</li>
                <li>• Lamp aging & warranty expiration</li>
                <li>• Clutters living room storage closet</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#176B52]/10 border border-[#176B52]/30 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-emerald-300">
                Option B: LendKart Rental
              </span>
              <div className="text-3xl font-extrabold font-display text-[#176B52] dark:text-emerald-300">
                ₹450 / day
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li>✓ 99% cheaper than buying new</li>
                <li>✓ Tested and pre-configured gear</li>
                <li>✓ 100% refunded security deposit</li>
                <li>✓ Return and never worry about maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FAQ ACCORDION
          ========================================================================= */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
            Clear Answers
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#14211D] overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    activeFaq === idx ? 'rotate-180 text-[#176B52]' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed border-t border-[#E5E0D2]/50 dark:border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. BOTTOM CAMPAIGN CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] p-8 sm:p-14 bg-[#176B52] text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <h3 className="text-3xl sm:text-5xl font-extrabold font-display max-w-2xl mx-auto leading-tight">
            Ready for your movie night or match screening?
          </h3>
          <p className="text-sm text-white/85 max-w-xl mx-auto">
            Book verified laser and 4K projectors in your neighborhood today. Zero upfront booking fee.
          </p>
          <div>
            <Button
              as={Link}
              to="/explore?category=electronics&search=projector"
              variant="accent"
              className="!px-9 !py-4 !rounded-2xl !bg-[#C96F52] hover:!bg-[#B55E42] text-white font-extrabold text-sm shadow-xl"
            >
              <span>Explore Available Projectors</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectorLandingPage;
