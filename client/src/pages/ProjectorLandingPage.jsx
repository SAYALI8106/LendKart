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
  Clock
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
    a: 'Security deposits are held securely during your rental period. As soon as the projector is returned in original functional condition, the deposit is instantly released back to your original payment method.'
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
    <div className="space-y-24 sm:space-y-32 py-6">
      <SEO
        title="Need a Projector for One Day? Don't Buy One — Rent from ₹350/day"
        description="Hire 4K home cinema and laser projectors in Pune, Mumbai, Bengaluru for movie nights, sports screenings, and terrace parties. Save 90% on purchase costs."
      />

      {/* 1. HIGH-CONVERSION HERO */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-[#176B52]/5 dark:bg-[#176B52]/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] text-[#176B52] dark:text-[#8EAFA0] text-xs font-bold shadow-soft-sm">
            <Zap className="w-4 h-4 text-[#C96F52]" />
            <span>Local Neighborhood Rentals • Pune & Mumbai Metro</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display text-[#17201D] dark:text-[#F8F6F0] tracking-tight leading-[1.08]">
            Need a Projector for One Day?{' '}
            <span className="text-[#176B52] dark:text-[#8EAFA0] block">Don't Buy One.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#5C6E66] dark:text-[#A8C8B5] max-w-2xl mx-auto leading-relaxed">
            Rent high-lumen 1080p and 4K laser projectors starting from just <span className="text-[#C96F52] font-bold">₹350/day</span>. Perfect for terrace movie nights, college fests, gaming tournaments, and match watch parties.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/explore?category=electronics&search=projector">
              <Button variant="accent" size="lg" className="w-full sm:w-auto text-base font-bold shadow-soft-sm cursor-pointer">
                <span>Find a Projector Near You</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <div className="text-xs text-[#788880] dark:text-[#7D9B8E] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#176B52] dark:text-[#8EAFA0]" />
              <span>Available for pickup in 2 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COST COMPARISON TABLE (BUY VS RENT) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-[#14211D] p-6 sm:p-10 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">
              The Smart Math: Buying vs. Renting
            </h2>
            <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">
              Why lock up thousands of rupees for gear you only use 3 or 4 weekends a year?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Buying Box */}
            <div className="p-6 rounded-2xl bg-[#FBF9F5] dark:bg-[#0E1714] border border-rose-500/20 space-y-3">
              <div className="text-xs uppercase font-bold text-rose-700 dark:text-rose-400 tracking-wider">
                Option A: Buying New
              </div>
              <div className="text-3xl font-extrabold text-[#17201D] dark:text-[#F8F6F0] font-display">
                ₹45,000+
              </div>
              <ul className="space-y-2 text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
                <li className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <span>✕</span> Instant capital lockup
                </li>
                <li className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <span>✕</span> Lamp degradation & maintenance
                </li>
                <li className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <span>✕</span> Clutters closet for 360 days a year
                </li>
                <li className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <span>✕</span> 40% value depreciation in 12 months
                </li>
              </ul>
            </div>

            {/* Renting on LendKart Box */}
            <div className="p-6 rounded-2xl bg-[#176B52]/10 border border-[#176B52]/30 space-y-3 relative overflow-hidden shadow-soft-sm">
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#C96F52] text-white text-[10px] font-bold">
                RECOMMENDED
              </div>
              <div className="text-xs uppercase font-bold text-[#176B52] dark:text-[#8EAFA0] tracking-wider">
                Option B: LendKart Rental
              </div>
              <div className="text-3xl font-extrabold text-[#176B52] dark:text-[#8EAFA0] font-display">
                ₹450 / day
              </div>
              <ul className="space-y-2 text-xs text-[#17201D] dark:text-[#EAEFE9]">
                <li className="flex items-center gap-2 text-[#176B52] dark:text-[#8EAFA0] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Save over 98% upfront cash
                </li>
                <li className="flex items-center gap-2 text-[#176B52] dark:text-[#8EAFA0] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Pristine condition pre-tested gear
                </li>
                <li className="flex items-center gap-2 text-[#176B52] dark:text-[#8EAFA0] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> HDMI + Screen bundles included
                </li>
                <li className="flex items-center gap-2 text-[#176B52] dark:text-[#8EAFA0] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Zero maintenance or storage headache
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTORS NEAR YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-[#8EAFA0] font-display">
            Instant Availability
          </span>
          <h2 className="text-3xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">
            Available Projectors in Pune & Mumbai
          </h2>
          <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">
            Book now for today or reserve for your upcoming weekend event.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectors.map((p) => (
            <ItemCard key={p._id} item={p} isFeatured />
          ))}
        </div>
      </section>

      {/* 4. TRUST & ACCREDITATION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-[#14211D] p-8 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-soft-sm">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#176B52] dark:text-[#8EAFA0] mx-auto" />
            <h4 className="font-bold text-sm text-[#17201D] dark:text-[#F8F6F0] font-display">100% Verified Lenders</h4>
            <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">Every equipment owner completes government ID verification.</p>
          </div>
          <div className="space-y-2">
            <DollarSign className="w-8 h-8 text-[#C96F52] mx-auto" />
            <h4 className="font-bold text-sm text-[#17201D] dark:text-[#F8F6F0] font-display">Safe Security Deposits</h4>
            <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">Deposits are held safely and refunded immediately upon return.</p>
          </div>
          <div className="space-y-2">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500 mx-auto" />
            <h4 className="font-bold text-sm text-[#17201D] dark:text-[#F8F6F0] font-display">4.9/5 Star Community</h4>
            <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">Over 500+ successful equipment rentals completed this year.</p>
          </div>
        </div>
      </section>

      {/* 5. FAQS ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">Everything you need to know about projector rentals</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              className="bg-white dark:bg-[#14211D] p-5 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] cursor-pointer transition-colors shadow-soft-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#17201D] dark:text-[#F8F6F0]">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#788880] transition-transform ${
                    activeFaq === i ? 'rotate-180 text-[#176B52]' : ''
                  }`}
                />
              </div>
              {activeFaq === i && (
                <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] mt-3 pt-3 border-t border-[#E7E2D6] dark:border-[#1E332B] leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. FINAL BOTTOM CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-[#176B52] p-10 rounded-3xl text-white space-y-4 shadow-soft-lg">
          <h3 className="text-2xl sm:text-3xl font-bold font-display">
            Hosting an Event This Weekend?
          </h3>
          <p className="text-xs sm:text-sm text-white/85 max-w-md mx-auto leading-relaxed">
            Browse top-rated projectors available in your local neighborhood and send a booking request in under 60 seconds.
          </p>
          <div className="pt-2">
            <Link to="/explore?category=electronics&search=projector">
              <Button variant="accent" size="lg" className="font-bold bg-[#C96F52] hover:bg-[#b05d42] border-0 text-white shadow-soft-md cursor-pointer">
                Reserve Your Projector Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectorLandingPage;
