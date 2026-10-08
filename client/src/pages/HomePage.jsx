import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Repeat,
  DollarSign,
  Leaf,
  Layers,
  HeartHandshake,
  Activity,
  Search,
  Send,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Star,
  Quote
} from 'lucide-react';
import InteractiveHeroVisual from '../components/marketplace/InteractiveHeroVisual';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryCard from '../components/marketplace/CategoryCard';
import ItemCard from '../components/marketplace/ItemCard';
import Button from '../components/common/Button';
import Skeleton, { ItemCardSkeleton } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/common/SEO';
import { itemService } from '../services/itemService';

// Animated Counter on Scroll into View
const AnimatedCounter = ({ value, suffix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let animationFrame;
    const start = performance.now();
    const duration = 1200;

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-extrabold font-display">
      {displayValue.toFixed(decimals)}{suffix}
    </span>
  );
};

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const [cats, items] = await Promise.all([
          itemService.getCategories(),
          itemService.getFeaturedItems()
        ]);
        setCategories(cats || []);
        setFeaturedItems(items || []);
      } catch (err) {
        setError(true);
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = featuredItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'projector') return item.title.toLowerCase().includes('projector');
    if (activeFilter === 'camera') return item.category?.slug === 'photography' || item.title.toLowerCase().includes('camera');
    if (activeFilter === 'gaming') return item.category?.slug === 'gaming';
    if (activeFilter === 'outdoor') return item.category?.slug === 'outdoor';
    return true;
  });

  return (
    <div className="space-y-24 sm:space-y-36 pb-12 overflow-hidden">
      <SEO
        title="LendKart — Don't Buy It. Lend It. | Premium Community Rental Marketplace"
        description="Borrow verified 4K laser projectors, DSLR cameras, power tools, camping tents, and consoles from neighbors near you."
      />

      {/* =========================================================================
          1. CINEMATIC HERO SECTION
          ========================================================================= */}
      <section className="relative mx-3 sm:mx-6 lg:mx-8 mt-2 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden text-white bg-[#0A1310] border border-white/10 shadow-2xl">
        {/* Subtle Ambient Grain & Dark Radiance Wash */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#176B52]/30 blur-[130px]" />
          <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full bg-[#C96F52]/20 blur-[140px]" />
          <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-[#86AFC4]/15 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Editorial Headline & Staggered Typography */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              {/* Top Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white backdrop-blur-md shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300">Verified Peer-to-Peer Gear Exchange</span>
                <span className="text-white/40">•</span>
                <span className="text-white/80">Pune & Mumbai</span>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.04] text-white"
                >
                  Why buy it when you can{' '}
                  <span className="text-emerald-300 underline decoration-[#C96F52] decoration-wavy decoration-2 underline-offset-8">
                    lend it?
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
                >
                  Borrow 4K projectors for movie nights, cinema cameras for weekend shoots, camping tents, and cordless power tools from verified neighbors. Pay only for the days you actually use.
                </motion.p>
              </div>

              {/* Hero CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Button
                  as={Link}
                  to="/explore"
                  variant="accent"
                  size="lg"
                  className="px-8 !bg-[#C96F52] hover:!bg-[#B55E42] !text-white font-extrabold shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <span>Explore Gear Catalog</span>
                  <ArrowRight className="w-4.5 h-4.5 ml-2" />
                </Button>

                <Button
                  as={Link}
                  to="/list-item"
                  variant="outline"
                  size="lg"
                  className="px-7 !border-white/30 !text-white hover:!bg-white/10 backdrop-blur-md font-extrabold hover:scale-105 transition-all duration-300"
                >
                  <span>List Your Item</span>
                </Button>
              </motion.div>

              {/* Value Pill Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-white/80"
              >
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% ID Verified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  <DollarSign className="w-4 h-4 text-amber-300" />
                  <span>Save Up to 90%</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Zero Purchase Clutter</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Dynamic Interactive Hero Gear Visual */}
            <div className="lg:col-span-6 relative">
              <InteractiveHeroVisual />
            </div>
          </div>

          {/* Integrated Search Bar Capsule */}
          <div className="mt-12 sm:mt-16 z-20 relative">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ASYMMETRIC EDITORIAL CATEGORY SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
              Curated Equipment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17201D] dark:text-[#F7F4EC] tracking-tight">
              Browse Rental Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5] max-w-xl">
              From laser projectors to professional camera rigs, find verified equipment ready for pickup near you.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#176B52] dark:text-[#A8C8B5] hover:text-[#125440] transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            icon={Layers}
            title="Categories are warming up"
            description="We could not load categories right now. You can still explore the gear catalog."
            actionLabel="Explore Gear"
            onAction={() => window.location.assign('/explore')}
          />
        ) : (
          /* Asymmetrical Editorial Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
            {categories.slice(0, 7).map((cat, idx) => {
              // Asymmetric span layout
              let colSpan = 'lg:col-span-4';
              let variant = 'default';

              if (idx === 0) {
                colSpan = 'lg:col-span-7'; // Large feature card
                variant = 'wide';
              } else if (idx === 1) {
                colSpan = 'lg:col-span-5';
                variant = 'default';
              } else if (idx === 2) {
                colSpan = 'lg:col-span-4';
                variant = 'default';
              } else if (idx === 3) {
                colSpan = 'lg:col-span-4';
                variant = 'default';
              } else if (idx === 4) {
                colSpan = 'lg:col-span-4';
                variant = 'default';
              } else if (idx === 5) {
                colSpan = 'lg:col-span-6';
                variant = 'wide';
              } else if (idx === 6) {
                colSpan = 'lg:col-span-6';
                variant = 'wide';
              }

              return (
                <div key={cat._id || idx} className={`${colSpan}`}>
                  <CategoryCard category={cat} variant={variant} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          3. FEATURED GEAR SHOWCASE (EDITORIAL PRODUCT CARDS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
              High-Demand Equipment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#17201D] dark:text-[#F7F4EC] tracking-tight mt-1">
              Featured Items Available Today
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5] mt-1">
              Verified lenders, insured security deposits, and instant booking availability.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#176B52] dark:text-[#A8C8B5] hover:text-[#125440] transition-colors"
          >
            <span>Explore All 30+ Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'all', label: 'All Equipment' },
            { id: 'projector', label: '4K Projectors' },
            { id: 'camera', label: 'Cinema Cameras' },
            { id: 'gaming', label: 'Gaming Consoles' },
            { id: 'outdoor', label: 'Camping & Tents' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-[#176B52] text-white shadow-soft-sm scale-105'
                  : 'bg-white dark:bg-[#14211D] text-slate-700 dark:text-slate-300 border border-[#E5E0D2] dark:border-white/10 hover:border-[#176B52]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ItemCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No items found in this filter"
            description="Try selecting a different category or explore the full gear catalog."
            actionLabel="Reset Filter"
            onAction={() => setActiveFilter('all')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.slice(0, 8).map((item, idx) => (
              <ItemCard key={item._id} item={item} isFeatured={idx < 4} />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          4. "HOW LENDKART WORKS" — VISUAL JOURNEY TIMELINE
          ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-[3rem] bg-[#FFFDF8] dark:bg-[#111E1A] border border-[#E5E0D2] dark:border-white/10 shadow-soft-md">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
              Frictionless Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#17201D] dark:text-[#F7F4EC] tracking-tight">
              How Renting Works on LendKart
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5]">
              Four simple, secure steps from discovering gear to instant deposit return.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: '01',
                title: 'DISCOVER',
                desc: 'Browse local 4K projectors, DSLR rigs, and power tools near you with verified lender ratings.',
                tag: 'Neighborhood Browse',
                icon: Search,
                image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
              },
              {
                step: '02',
                title: 'REQUEST',
                desc: 'Select your rental dates. Submit a booking request with zero payment upfront until approved.',
                tag: 'Zero Risk Booking',
                icon: Send,
                image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80'
              },
              {
                step: '03',
                title: 'BORROW',
                desc: 'Coordinate quick pickup or delivery. Inspect condition and power up your event or project.',
                tag: 'Safe Handover',
                icon: Play,
                image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
              },
              {
                step: '04',
                title: 'RETURN',
                desc: 'Hand the gear back, receive an instant security deposit refund, and leave a community review.',
                tag: 'Instant Refund',
                icon: RotateCcw,
                image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
              }
            ].map((item, idx) => (
              <div
                key={item.step}
                className="group relative bg-[#F7F4EC] dark:bg-[#14211D] rounded-3xl p-6 border border-[#E5E0D2] dark:border-white/10 hover:border-[#176B52]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-display text-[#176B52] dark:text-[#A8C8B5]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white dark:bg-black/40 text-slate-700 dark:text-slate-300 border border-[#E5E0D2] dark:border-white/10">
                    {item.tag}
                  </span>
                </div>

                {/* Step Image */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-200 dark:bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY LENDKART — EDITORIAL STORYTELLING & VALUE PROPOSITION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: The Problem & Statement */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C96F52] font-display">
              The Real Problem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#17201D] dark:text-[#F7F4EC] tracking-tight leading-tight">
              Millions of useful things sit unused every day.
            </h2>
            <p className="text-base text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
              Why spend ₹45,000 on a 4K projector or ₹12,000 on a heavy cordless drill that you only need two evenings a year? The average power drill is used for less than 13 minutes in its entire lifespan.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C96F52]/15 text-[#C96F52] flex items-center justify-center shrink-0 font-bold">
                  ✕
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display">The Traditional Buying Trap</h4>
                  <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] mt-0.5">High upfront cost, rapid obsolescence, storage clutter, and depreciating value.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#176B52]/10 dark:bg-[#176B52]/20 border border-[#176B52]/30 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#176B52] text-white flex items-center justify-center shrink-0 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#176B52] dark:text-emerald-300 font-display">The LendKart Shared Model</h4>
                  <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] mt-0.5">Pay ₹450 for the exact day you need it. Zero storage. Zero maintenance hassle.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Cost Equation Comparison Box */}
          <div className="lg:col-span-6">
            <div className="rounded-[2.5rem] p-8 sm:p-10 bg-[#0E1714] text-white border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#176B52]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Real Example</span>
                  <span className="text-xs text-white/60">Terrace Movie Night</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80">Buying 4K Smart Projector:</span>
                    <span className="font-bold text-rose-400 line-through">₹48,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80">Lending on LendKart (1 Day):</span>
                    <span className="text-xl font-extrabold text-emerald-300">₹450</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex justify-between items-center text-xs font-bold">
                    <span>Instant Money Saved:</span>
                    <span className="text-amber-300">₹47,550 (99%)</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Button
                    as={Link}
                    to="/rent/projector"
                    variant="accent"
                    className="w-full !py-3.5 !rounded-2xl !bg-[#C96F52] hover:!bg-[#B55E42] font-bold text-sm cursor-pointer"
                  >
                    <span>Rent a Projector for ₹450</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. DYNAMIC STATISTICS SECTION (ANIMATED METRICS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#111E1A] p-8 sm:p-12 rounded-[2.5rem] border border-[#E5E0D2] dark:border-white/10 shadow-soft-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#E5E0D2] dark:border-white/10 gap-3">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Platform Momentum
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5] mt-1">
                Real-time marketplace transactions across Pune, Mumbai, and Bengaluru metros.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#176B52] dark:text-[#A8C8B5] px-4 py-2 rounded-full bg-[#176B52]/10 dark:bg-[#176B52]/20 border border-[#176B52]/20 self-start sm:self-auto">
              <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              Live Network Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#F7F4EC] dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/5 space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-[#176B52]/15 text-[#176B52] dark:text-emerald-300 flex items-center justify-center mb-2">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-5xl text-slate-900 dark:text-white">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <div className="text-xs font-bold text-[#5C6E66] dark:text-[#A8C8B5]">Active Listings</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4EC] dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/5 space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-[#176B52]/15 text-[#176B52] dark:text-emerald-300 flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-5xl text-[#176B52] dark:text-emerald-300">
                <AnimatedCounter value={20} suffix="+" />
              </div>
              <div className="text-xs font-bold text-[#5C6E66] dark:text-[#A8C8B5]">Verified Lenders</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4EC] dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/5 space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-[#176B52]/15 text-[#176B52] dark:text-emerald-300 flex items-center justify-center mb-2">
                <Repeat className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-5xl text-slate-900 dark:text-white">
                <AnimatedCounter value={10} suffix="+" />
              </div>
              <div className="text-xs font-bold text-[#5C6E66] dark:text-[#A8C8B5]">Rental Categories</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4EC] dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/5 space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-[#C96F52]/15 text-[#C96F52] flex items-center justify-center mb-2">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="text-3xl sm:text-5xl text-[#C96F52]">
                <AnimatedCounter value={4.9} decimals={1} suffix=" ★" />
              </div>
              <div className="text-xs font-bold text-[#5C6E66] dark:text-[#A8C8B5]">Average Trust Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SUSTAINABILITY & COMMUNITY SECTION ("Use More. Buy Less.")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] p-8 sm:p-14 overflow-hidden bg-[#176B52] text-white shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                Sustainable Consumption
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
                Use More. Buy Less.
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
                Every shared projector, DSLR camera, and tent rented in your neighborhood prevents another item from being manufactured, shipped across continents, and eventually dumped in a landfill.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl font-extrabold font-display text-emerald-300">~68 kg CO₂</div>
                  <div className="text-xs text-white/80 mt-1">Offset per rented camera rig</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl font-extrabold font-display text-amber-300">12 : 1</div>
                  <div className="text-xs text-white/80 mt-1">Single-use purchase replacement ratio</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable community sharing"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-white text-center">
                  🌱 100% Community-Powered Sharing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. COMMUNITY VOICES / LENDER & BORROWER TESTIMONIALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Trusted by Creators, Hosts & Makers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'Rented the BenQ 4K projector for a rooftop India vs Australia match party in Viman Nagar. Setup took 5 minutes, picture was crystal clear, saved ₹50k!',
              author: 'Siddharth Nair',
              role: 'Borrower • Pune',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
            },
            {
              quote: 'My Sony A7 IV camera used to sit on a shelf between weekend shoots. I now earn over ₹14,000 every month renting it out to verified indie filmmakers.',
              author: 'Pooja Deshmukh',
              role: 'Super Lender • Bandra, Mumbai',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
            },
            {
              quote: 'Needed a cordless hammer drill for hanging gallery frames in our new apartment. Found a Bosch 18V drill 800m away for ₹150. Returned same day!',
              author: 'Rohan Joshi',
              role: 'DIY Borrower • Baner, Pune',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 shadow-soft-sm flex flex-col justify-between space-y-4 hover:border-[#176B52]/40 transition-colors"
            >
              <div className="space-y-3">
                <Quote className="w-7 h-7 text-[#176B52] dark:text-[#A8C8B5] opacity-50" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E0D2] dark:border-white/10">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#176B52]/20"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white font-display">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-[#5C6E66] dark:text-[#A8C8B5]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. BOTTOM HIGH-CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] p-8 sm:p-14 overflow-hidden bg-[#0A1310] text-white border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center sm:text-left max-w-xl">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Join the Community
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Have gear lying idle in your closet?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              List your projector, camera, gaming console, or power drill on LendKart in under 2 minutes. Earn passive monthly income safely with verified ID security deposits.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Button
              as={Link}
              to="/list-item"
              variant="accent"
              className="!px-8 !py-4 !rounded-2xl !bg-[#C96F52] hover:!bg-[#B55E42] !text-white font-extrabold text-sm shadow-xl cursor-pointer"
            >
              <span>List an Item Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
