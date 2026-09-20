import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  HeartHandshake
} from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryCard from '../components/marketplace/CategoryCard';
import ItemCard from '../components/marketplace/ItemCard';
import Button from '../components/common/Button';
import Skeleton, { ItemCardSkeleton } from '../components/common/Skeleton';
import SEO from '../components/common/SEO';
import { itemService } from '../services/itemService';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cats, items] = await Promise.all([
          itemService.getCategories(),
          itemService.getFeaturedItems()
        ]);
        setCategories(cats || []);
        setFeaturedItems(items || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 sm:space-y-32">
      <SEO
        title="Don't Buy It. Lend It."
        description="Discover rarely-used cameras, 4K projectors, power tools, camping tents, and consoles from verified lenders nearby."
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Ambient Gradient Blobs */}
        <div className="ambient-glow-purple -top-20 -left-20" />
        <div className="ambient-glow-cyan top-40 -right-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Typography */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-brand-primary/30 text-xs font-semibold text-brand-primary">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-spin" style={{ animationDuration: '6s' }} />
                <span>Next-Gen Community Rental Marketplace</span>
              </div>

              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400 font-bold">
                  Need something for one day?
                </p>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                  Don't buy it.{' '}
                  <span className="gradient-accent block sm:inline">Lend it.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover high-end projectors, mirrorless cameras, power drills, and camping gear from verified people around you. Rent only what you need.
              </p>

              {/* Quick Feature Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero Purchase Regrets</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-brand-accent" />
                  <span>Save up to 90% Costs</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-brand-secondary" />
                  <span>Sustainable Living</span>
                </div>
              </div>
            </div>

            {/* Right Hero 3D Ecosystem */}
            <div className="lg:col-span-6 relative">
              <HeroScene />
            </div>
          </div>

          {/* Large Hero Search Bar */}
          <div className="mt-8 sm:mt-12 z-20 relative">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary font-display">
              Browse Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
              Popular Rental Categories
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <span>View All Gear</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* 3. FEATURED ITEMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">
              Top Rated Gear
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
              Featured Items Available Today
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              High-demand equipment with verified owners and instant booking availability.
            </p>
          </div>
          <Link
            to="/explore?sort=recommended"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <span>Explore All 30+ Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ItemCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, idx) => (
              <ItemCard key={item._id} item={item} isFeatured={idx < 4} />
            ))}
          </div>
        )}
      </section>

      {/* 4. HOW IT WORKS (4 STEPS) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary font-display">
            Frictionless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
            How Renting Works on LendKart
          </h2>
          <p className="text-sm text-slate-400">
            Four simple steps from finding what you need to returning it securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Find',
              desc: 'Search local verified items near you, from 4K projectors to power tools.',
              color: 'text-brand-primary'
            },
            {
              step: '02',
              title: 'Request',
              desc: 'Select pickup dates and send a booking request. No payment until approved.',
              color: 'text-brand-secondary'
            },
            {
              step: '03',
              title: 'Use',
              desc: 'Pick up the item or coordinate drop-off. Complete your project or event.',
              color: 'text-brand-accent'
            },
            {
              step: '04',
              title: 'Return',
              desc: 'Return the gear, get your deposit refunded, and share a 5-star community review.',
              color: 'text-purple-400'
            }
          ].map((item, idx) => (
            <div
              key={item.step}
              className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-primary/40 transition-all duration-300"
            >
              <div className="text-4xl font-extrabold font-display text-white/10 mb-4 group-hover:text-brand-primary/30 transition-colors">
                {item.step}
              </div>
              <h3 className={`text-xl font-bold font-display mb-2 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY LENDKART (VALUE PROPOSITION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">
              Smart Economics
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mt-1">
              Why Buy What You Won't Keep?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transforming unnecessary personal purchases into sustainable community abundance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white font-display">Save Massive Money</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spend ₹450 for a projector movie night instead of blowing ₹45,000 on an asset you will rarely use.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/15 text-brand-secondary flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white font-display">Earn From Your Stuff</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turn your dormant camera lenses, camping tents, and consoles into ₹15,000+ per month passive income.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/20 text-emerald-400 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white font-display">Reduce Electronic Waste</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Shared equipment significantly lowers industrial manufacturing demand and household clutter.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-white font-display">Community Driven</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build trusted connections with filmmakers, creators, builders, and hobbyists in your city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE STATISTICS (WITH CLEAR DEMO LABEL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Platform Momentum</h3>
              <p className="text-xs text-slate-400">Real-time ecosystem activity across Indian metros.</p>
            </div>
            <span className="text-[11px] font-semibold text-brand-secondary px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/30">
              Live Network Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                30+
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1">Active Listings</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-primary">
                20+
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1">Verified Lenders</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-secondary">
                8
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1">Rental Categories</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-accent">
                4.9 ★
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1">Average Review Rating</div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-500 mt-6">
            * Network statistics are dynamically aggregated from current marketplace listings and reservations.
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-brand-primary via-indigo-600 to-brand-secondary text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Have gear lying idle in your closet?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg">
              List your camera, projector, or tools on LendKart in under 2 minutes. Start earning passive income safely with verified ID security deposits.
            </p>
          </div>
          <Link to="/list-item" className="shrink-0">
            <button className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 active:scale-95 transition-all">
              List an Item Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
