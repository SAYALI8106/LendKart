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
      <section className="relative pt-6 sm:pt-14 overflow-hidden">
        {/* Subtle warm architectural ambient blur */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#176B52]/5 dark:bg-[#176B52]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#C96F52]/5 dark:bg-[#C96F52]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Typography */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] text-xs font-semibold text-[#176B52] dark:text-[#8EAFA0] shadow-soft-sm">
                <span className="w-2 h-2 rounded-full bg-[#176B52] dark:bg-[#8EAFA0]" />
                <span>The Community Rental Marketplace</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-[#17201D] dark:text-[#F8F6F0]">
                  Don't buy it.{' '}
                  <span className="text-[#176B52] dark:text-[#8EAFA0] block sm:inline">Lend it.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#5C6E66] dark:text-[#A8C8B5] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Borrow high-quality cameras, 4K projectors, power tools, and outdoor equipment from verified neighbors. Save money, free up storage, and live sustainably.
                </p>
              </div>

              {/* Primary & Secondary Hero CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link to="/explore">
                  <Button variant="primary" size="lg" className="px-8 shadow-soft-md cursor-pointer">
                    <span>Explore Items</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/list-item">
                  <Button variant="outline" size="lg" className="px-7 cursor-pointer">
                    <span>List Your Item</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Feature Trust Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#788880] dark:text-[#7D9B8E] pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#176B52] dark:text-[#8EAFA0]" />
                  <span>Verified Community Lenders</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#C96F52]" />
                  <span>Save Up to 90% Costs</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-[#176B52] dark:text-[#8EAFA0]" />
                  <span>Circular Sharing Economy</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-[#8EAFA0] font-display">
              Browse Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0] mt-1">
              Popular Rental Categories
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B52] dark:text-[#8EAFA0] hover:text-[#125440] transition-colors"
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-[#8EAFA0] font-display">
              Top Rated Gear
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0] mt-1">
              Featured Items Available Today
            </h2>
            <p className="text-xs text-[#788880] dark:text-[#7D9B8E] mt-1">
              High-demand equipment with verified owners and instant booking availability.
            </p>
          </div>
          <Link
            to="/explore?sort=recommended"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B52] dark:text-[#8EAFA0] hover:text-[#125440] transition-colors"
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-[#8EAFA0] font-display">
            Frictionless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">
            How Renting Works on LendKart
          </h2>
          <p className="text-sm text-[#5C6E66] dark:text-[#A8C8B5]">
            Four simple steps from finding what you need to returning it securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Find',
              desc: 'Search local verified items near you, from 4K projectors to power tools.',
              tag: 'Browse local'
            },
            {
              step: '02',
              title: 'Request',
              desc: 'Select pickup dates and send a booking request. No payment until approved.',
              tag: 'Zero deposit risk'
            },
            {
              step: '03',
              title: 'Use',
              desc: 'Pick up the item or coordinate drop-off. Complete your project or event.',
              tag: 'Enjoy quality gear'
            },
            {
              step: '04',
              title: 'Return',
              desc: 'Return the gear, get your deposit refunded, and share a 5-star community review.',
              tag: 'Prompt refund'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white dark:bg-[#14211D] p-6 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] relative overflow-hidden group hover:border-[#176B52]/40 transition-all duration-300 shadow-soft-sm hover:shadow-soft-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold font-display text-[#E7E2D6] dark:text-[#1E332B] group-hover:text-[#176B52]/30 transition-colors">
                  {item.step}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F4F1EA] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] border border-[#E7E2D6] dark:border-[#1E332B]">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display mb-2 text-[#17201D] dark:text-[#F8F6F0]">
                {item.title}
              </h3>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY LENDKART (VALUE PROPOSITION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#14211D] p-8 sm:p-14 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] relative overflow-hidden shadow-soft-sm">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-[#8EAFA0] font-display">
              Smart Economics
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0] mt-1">
              Why Buy What You Won't Keep?
            </h2>
            <p className="text-sm text-[#5C6E66] dark:text-[#A8C8B5] mt-2 leading-relaxed">
              Transforming unnecessary single-use personal purchases into sustainable community abundance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-[#176B52]/10 text-[#176B52] dark:text-[#8EAFA0] flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] font-display">Save Massive Money</h4>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                Spend ₹450 for a projector movie night instead of blowing ₹45,000 on an asset you will rarely use.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-[#8EAFA0]/15 text-[#176B52] dark:text-[#8EAFA0] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] font-display">Earn From Your Stuff</h4>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                Turn your dormant camera lenses, camping tents, and consoles into ₹15,000+ per month passive income.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-[#176B52]/15 text-[#176B52] dark:text-[#8EAFA0] flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] font-display">Reduce Electronic Waste</h4>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                Shared equipment significantly lowers industrial manufacturing demand and household clutter.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-[#C96F52]/15 text-[#C96F52] flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] font-display">Community Driven</h4>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
                Build trusted connections with filmmakers, creators, builders, and hobbyists in your city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#14211D] p-8 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E7E2D6] dark:border-[#1E332B]">
            <div>
              <h3 className="text-xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Platform Momentum</h3>
              <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">Real-time ecosystem activity across Indian metros.</p>
            </div>
            <span className="text-[11px] font-semibold text-[#176B52] dark:text-[#8EAFA0] px-3 py-1 rounded-full bg-[#176B52]/10 dark:bg-[#176B52]/20 border border-[#176B52]/20">
              Live Network Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#0E1714]">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#17201D] dark:text-[#F8F6F0]">
                30+
              </div>
              <div className="text-xs font-medium text-[#788880] dark:text-[#7D9B8E] mt-1">Active Listings</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#0E1714]">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#176B52] dark:text-[#8EAFA0]">
                20+
              </div>
              <div className="text-xs font-medium text-[#788880] dark:text-[#7D9B8E] mt-1">Verified Lenders</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#0E1714]">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#176B52] dark:text-[#8EAFA0]">
                8
              </div>
              <div className="text-xs font-medium text-[#788880] dark:text-[#7D9B8E] mt-1">Rental Categories</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F0] dark:bg-[#0E1714]">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#C96F52]">
                4.9 ★
              </div>
              <div className="text-xs font-medium text-[#788880] dark:text-[#7D9B8E] mt-1">Average Review Rating</div>
            </div>
          </div>

          <div className="text-center text-[10px] text-[#788880] dark:text-[#7D9B8E] mt-6">
            * Network statistics are dynamically aggregated from current marketplace listings and reservations.
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-[#176B52] text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Have gear lying idle in your closet?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 max-w-lg leading-relaxed">
              List your camera, projector, or tools on LendKart in under 2 minutes. Start earning passive income safely with verified ID security deposits.
            </p>
          </div>
          <Link to="/list-item" className="shrink-0">
            <button className="px-7 py-3.5 rounded-2xl bg-[#FFFDF8] text-[#176B52] font-bold text-sm shadow-soft-md hover:bg-white active:scale-98 transition-all cursor-pointer">
              List an Item Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
