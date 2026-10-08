import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, MapPin, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';

export const ItemCard = ({ item, isFeatured = false }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const wishlisted = isWishlisted(item._id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

  return (
    <Link
      to={`/items/${item._id}`}
      data-cursor="RENT"
      className="interactive-card group relative bg-white dark:bg-[#14211D] rounded-3xl overflow-hidden border border-[#E5E0D2] dark:border-white/10 shadow-soft-sm hover:shadow-2xl hover:border-[#176B52]/40 transition-all duration-500 flex flex-col h-full"
    >
      {/* 1. Large Editorial Photography Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8DC] dark:bg-[#0E1714]">
        <img
          src={item.images?.[0] || fallbackImage}
          alt={item.title}
          className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.96] group-hover:brightness-100 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />

        {/* Soft Contrast Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

        {/* Top Badges: Category & Featured Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-[#0E1714]/90 backdrop-blur-md text-slate-800 dark:text-white border border-white/20 shadow-xs">
            {item.category?.name || 'Gear'}
          </span>
          {isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#C96F52] text-white shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
            wishlisted
              ? 'bg-[#C96F52] text-white shadow-md shadow-[#C96F52]/40 scale-105'
              : 'bg-white/80 dark:bg-black/50 text-slate-700 dark:text-slate-200 hover:text-[#C96F52] hover:bg-white hover:scale-110 shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Floating Price Badge */}
        <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/15">
          <span className="text-sm font-extrabold font-display text-emerald-300">
            {formatINR(item.pricePerDay)}
          </span>
          <span className="text-[10px] text-white/70 font-medium">/ day</span>
        </div>

        {/* Condition Tag */}
        {item.condition && (
          <div className="absolute bottom-3 right-3.5 z-10 px-2.5 py-1 rounded-xl bg-white/85 dark:bg-[#0E1714]/85 backdrop-blur-md text-[10px] font-bold text-slate-800 dark:text-slate-200 border border-white/20 shadow-xs">
            {item.condition}
          </div>
        )}
      </div>

      {/* 2. Card Metadata Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white dark:bg-[#14211D]">
        <div className="space-y-2">
          {/* Rating and Location Header */}
          <div className="flex items-center justify-between text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-800 dark:text-white">
                {item.rating?.toFixed(1) || '4.9'}
              </span>
              <span className="text-[10px] text-slate-400">
                ({item.numReviews || 8})
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] truncate max-w-[140px] font-semibold text-slate-600 dark:text-slate-300">
              <MapPin className="w-3 h-3 text-[#176B52] dark:text-[#A8C8B5] shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-[#176B52] dark:group-hover:text-[#A8C8B5] transition-colors leading-snug line-clamp-2 font-display">
            {item.title}
          </h3>
        </div>

        {/* Owner & Instant Action Footer */}
        <div className="pt-3 border-t border-[#EAE6DC] dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={item.owner?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={item.owner?.name || 'Owner'}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-[#176B52]/30"
            />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <span className="truncate max-w-[90px]">{item.owner?.name?.split(' ')[0] || 'Verified'}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#176B52] dark:text-[#A8C8B5]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#176B52] dark:text-[#A8C8B5] group-hover:text-[#C96F52] transition-colors">
            <span>Rent Now</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
