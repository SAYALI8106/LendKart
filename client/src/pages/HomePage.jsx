import React, { useState, useEffect, useRef } from 'react';
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
  HeartHandshake,
  Activity,
  Search,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryCard from '../components/marketplace/CategoryCard';
import ItemCard from '../components/marketplace/ItemCard';
import Button from '../components/common/Button';
import Skeleton, { ItemCardSkeleton } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import RevealOnScroll from '../components/common/RevealOnScroll';
import SEO from '../components/common/SEO';
import { itemService } from '../services/itemService';

const MetricValue = ({ value, suffix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame;
    const start = performance.now();
    const duration = 900;

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <>{displayValue.toFixed(decimals)}{suffix}</>;
};

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Background Video State
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

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

  const retryFetch = () => window.location.reload();

  return (
    <div className="space-y-20 sm:space-y-28">
      <SEO
        title="Don't Buy It. Lend It."
        description="Discover rarely-used cameras, 4K projectors, power tools, camping tents, and consoles from verified lenders nearby."
      />

      {/* 1. HERO SECTION WITH BACKGROUND VIDEO */}
      <section className="relative mx-2 sm:mx-4 lg:mx-6 mt-2 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden text-white shadow-soft-lg border border-white/10 group">
        {/* Background Video & Dark Gradient Wash */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-45 scale-105 filter brightness-90 saturate-125 transition-opacity duration-1000"
            poster="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2200&q=85"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-cameraman-focusing-a-camera-lens-41525-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://cdn.coverr.co/videos/coverr-film-camera-lens-adjustment-5290/1080p.mp4"
              type="video/mp4"
            />
          </video>

          {/* Cinematic Dark Gradient Layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071310]/95 via-[#071310]/80 to-[#071310]/45 z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071310] via-transparent to-[#071310]/60 z-1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(142,175,160,0.25),transparent_40%)] pointer-events-none z-1" />
        </div>

        <div className="cinematic-vignette z-2" aria-hidden="true" />
        <div className="cinematic-grain z-2" aria-hidden="true" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-primary/20 blur-3xl pointer-events-none z-2" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#C96F52]/20 blur-3xl pointer-events-none z-2" />

        {/* Floating Background Video Controls */}
        <div className="absolute bottom-4 right-6 z-20 hidden sm:flex items-center gap-2">
          <button
            onClick={toggleVideoPlay}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 backdrop-blur-md text-white text-xs font-bold transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5 px-3"
            title={isVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isVideoPlaying ? 'Pause Ambient' : 'Play Video'}</span>
          </button>
          <button
            onClick={toggleVideoMute}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 backdrop-blur-md text-white transition-all hover:scale-105 cursor-pointer"
            title={isVideoMuted ? 'Unmute video' : 'Mute video'}
          >
            {isVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        </div>

        <div className="cinematic-content relative z-10 max-w-7xl mx-auto px-5 py-12 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Typography */}
            <div className="cinematic-reveal lg:col-span-6 space-y-7 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-xs font-bold text-white shadow-soft-sm backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <span>✨ #1 Peer-to-Peer Gear Rental Marketplace</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.04] text-white">
                  Don't buy it.{' '}
                  <span className="bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200 bg-clip-text text-transparent block sm:inline drop-shadow-sm">Lend it.</span>
                </h1>
                <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Borrow high-quality 4K projectors, DSLR cameras, power tools, camping gear, and consoles directly from verified local neighbors. Save money, avoid clutter, and live sustainably.
                </p>
              </div>

              {/* Primary & Secondary Hero CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                <Button as={Link} to="/explore" variant="accent" size="lg" className="px-8 shadow-terracotta-glow hover:scale-105 transition-transform duration-300 font-extrabold cursor-pointer">
                    <span>Explore Gear Catalog</span>
                    <ArrowRight className="w-4.5 h-4.5 ml-2" />
                </Button>
                <Button as={Link} to="/list-item" variant="outline" size="lg" className="px-7 !border-white/40 !text-white hover:!bg-white/15 backdrop-blur-sm font-extrabold hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span>List Your Item</span>
                </Button>
              </div>

              {/* Quick Feature Trust Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-semibold text-white/80 pt-3">
                <div className="flex items-center gap-2 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>100% Verified Community Lenders</span>
                </div>
                <div className="flex items-center gap-2 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <DollarSign className="w-4 h-4 text-amber-300" />
                  <span>Save Up to 90% Costs</span>
                </div>
                <div className="flex items-center gap-2 bg-black/35 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <Leaf className="w-4 h-4 text-emerald-300" />
                  <span>Sustainable Eco Sharing</span>
                </div>
              </div>
            </div>

            {/* Right Hero 3D Ecosystem */}
            <div className="cinematic-reveal lg:col-span-6 relative [animation-delay:180ms]">
              <div className="min-h-[300px] sm:min-h-[420px]">
                <HeroScene />
              </div>
            </div>
          </div>

          {/* Large Hero Search Bar */}
          <div className="mt-8 sm:mt-14 z-20 relative">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <RevealOnScroll>
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
        ) : error ? (
          <EmptyState
            icon={Layers}
            title="The marketplace is taking a moment"
            description="We could not load categories right now. Try again, or explore all available gear."
            actionLabel="Try Again"
            onAction={retryFetch}
            className="my-0"
          />
        ) : categories.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="Categories are coming into focus"
            description="New local gear categories will appear here as lenders join the community."
            actionLabel="Explore Gear"
            onAction={() => window.location.assign('/explore')}
            className="my-0"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <div key={cat._id} className="reveal-card" style={{ '--reveal-delay': `${idx * 70}ms` }}>
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        )}
      </section>
      </RevealOnScroll>

      {/* 3. FEATURED ITEMS SHOWCASE */}
      <RevealOnScroll>
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
        ) : error ? (
          <EmptyState
            icon={Sparkles}
            title="Featured gear is warming up"
            description="We could not load the latest listings. Try again in a moment."
            actionLabel="Try Again"
            onAction={retryFetch}
            className="my-0"
          />
        ) : featuredItems.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Be first to share your gear"
            description="There are no featured listings yet. List an item and become part of the first wave of local lenders."
            actionLabel="List an Item"
            onAction={() => window.location.assign('/list-item')}
            className="my-0"
          />
        ) : (
          <div className="featured-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, idx) => (
              <div key={item._id} className="reveal-card" style={{ '--reveal-delay': `${idx * 90}ms` }}>
                <ItemCard item={item} isFeatured={idx < 4} />
              </div>
            ))}
          </div>
        )}
      </section>
      </RevealOnScroll>

      {/* 4. HOW IT WORKS (4 STEPS) */}
      <RevealOnScroll>
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-wash py-10 sm:py-14 rounded-[2rem]">
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
              tag: 'Browse local',
              icon: Search,
              image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80'
            },
            {
              step: '02',
              title: 'Request',
              desc: 'Select pickup dates and send a booking request. No payment until approved.',
              tag: 'Zero deposit risk',
              icon: Send,
              image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80'
            },
            {
              step: '03',
              title: 'Use',
              desc: 'Pick up the item or coordinate drop-off. Complete your project or event.',
              tag: 'Enjoy quality gear',
              icon: Play,
              image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80'
            },
            {
              step: '04',
              title: 'Return',
              desc: 'Return the gear, get your deposit refunded, and share a 5-star community review.',
              tag: 'Prompt refund',
              icon: RotateCcw,
              image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="step-card bg-white dark:bg-[#14211D] p-6 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] relative overflow-hidden group hover:border-[#176B52]/40 transition-all duration-300 shadow-soft-sm hover:shadow-soft-md"
            >
              <div className="step-card-image absolute top-0 left-0 right-0 h-32 overflow-hidden" aria-hidden="true">
                <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="step-card-line" aria-hidden="true" />
              <div className="step-card-content relative z-10 pt-28">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="step-card-icon flex items-center justify-center w-11 h-11 rounded-2xl bg-[#176B52]/10 dark:bg-[#176B52]/20 text-[#176B52] dark:text-[#A8C8B5] border border-[#176B52]/15 group-hover:bg-[#176B52] group-hover:text-white transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.16em] text-[#176B52] dark:text-[#8EAFA0]">STEP {item.step}</span>
                </div>
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
            </div>
          ))}
        </div>
      </section>
      </RevealOnScroll>

      {/* 5. WHY LENDKART (VALUE PROPOSITION) */}
      <RevealOnScroll>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-8 sm:p-14 rounded-[2rem] border border-[#E7E2D6] dark:border-[#1E332B] bg-white/80 dark:bg-[#14211D]/90 shadow-soft-md">
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
      </RevealOnScroll>

      {/* 6. INTERACTIVE STATISTICS */}
      <RevealOnScroll>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-[#111E1A]/90 p-8 sm:p-10 rounded-3xl border border-[#E6E1D5] dark:border-[#1E332B] shadow-soft-md backdrop-blur-md">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E6E1D5] dark:border-[#1E332B]">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-[#F8F6F0]">Platform Momentum</h3>
              <p className="text-xs text-[#52635B] dark:text-[#7D9B8E] mt-0.5 font-medium">Real-time ecosystem activity across Indian metros.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-brand-primary dark:text-brand-secondary px-3.5 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 shadow-xs">
              <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              Live Network Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="metric-card p-5 rounded-2xl bg-[#F8F6F0] dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/5 hover:border-brand-primary/30 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary flex items-center justify-center mb-2 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-[#F8F6F0]">
                <MetricValue value={30} suffix="+" />
              </div>
              <div className="text-xs font-bold text-[#52635B] dark:text-[#7D9B8E] mt-1">Active Listings</div>
            </div>

            <div className="metric-card p-5 rounded-2xl bg-[#F8F6F0] dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/5 hover:border-brand-primary/30 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary flex items-center justify-center mb-2 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-primary dark:text-brand-secondary">
                <MetricValue value={20} suffix="+" />
              </div>
              <div className="text-xs font-bold text-[#52635B] dark:text-[#7D9B8E] mt-1">Verified Lenders</div>
            </div>

            <div className="metric-card p-5 rounded-2xl bg-[#F8F6F0] dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/5 hover:border-brand-primary/30 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary flex items-center justify-center mb-2 shadow-xs">
                <Repeat className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-primary dark:text-brand-secondary">
                <MetricValue value={8} />
              </div>
              <div className="text-xs font-bold text-[#52635B] dark:text-[#7D9B8E] mt-1">Rental Categories</div>
            </div>

            <div className="metric-card p-5 rounded-2xl bg-[#F8F6F0] dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/5 hover:border-[#C96F52]/30 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-[#C96F52]/10 text-[#C96F52] flex items-center justify-center mb-2 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#C96F52]">
                <MetricValue value={4.9} decimals={1} suffix=" ★" />
              </div>
              <div className="text-xs font-bold text-[#52635B] dark:text-[#7D9B8E] mt-1">Average Review Rating</div>
            </div>
          </div>

          <div className="text-center text-[11px] font-medium text-[#82938B] dark:text-[#7D9B8E] mt-6">
            * Network statistics are dynamically aggregated from current marketplace listings and reservations.
          </div>
        </div>
      </section>
      </RevealOnScroll>

      {/* 7. CTA BANNER */}
      <RevealOnScroll>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] p-8 sm:p-12 overflow-hidden cta-backdrop text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Have gear lying idle in your closet?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 max-w-lg leading-relaxed">
              List your camera, projector, or tools on LendKart in under 2 minutes. Start earning passive income safely with verified ID security deposits.
            </p>
          </div>
          <Button as={Link} to="/list-item" variant="ghost" className="shrink-0 !px-7 !py-3.5 !rounded-2xl !bg-[#FFFDF8] !text-[#176B52] !font-bold !text-sm shadow-soft-md hover:!bg-white">
              <span>List an Item Now</span>
              <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
      </RevealOnScroll>
    </div>
  );
};

export default HomePage;
