import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, MapPin, ShieldCheck, Star } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';
import TiltCard from '../3d/TiltCard';

export const ItemCard = ({ item, isFeatured = false }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const wishlisted = isWishlisted(item._id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item);
  };

  const cardContent = (
    <div className="premium-card-surface item-card-shell bg-white dark:bg-[#111E1A] rounded-2xl overflow-hidden group flex flex-col h-full border border-[#E6E1D5] dark:border-[#1E332B] shadow-soft-sm hover:shadow-soft-md hover:border-brand-primary/60 transition-all duration-300">
      {/* Image Container with Badges */}
      <div className="card-image-frame relative aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9] dark:bg-[#0A1310]">
        <img
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          className={`item-card-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${imageLoaded ? 'is-loaded' : ''}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="image-motion-sheen" aria-hidden="true" />
        <div className="card-hover-glow" aria-hidden="true" />
        <div className="item-card-image-wash absolute inset-0" aria-hidden="true" />

        {isFeatured && (
          <span className="featured-ribbon absolute top-0 left-0 z-10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white bg-gradient-to-r from-[#C96F52] to-[#B55E42] shadow-soft-sm">
            ★ Featured
          </span>
        )}

        {/* Category & Condition Pill */}
        <div className="absolute top-3 left-3 flex gap-1.5 items-center z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-white/90 dark:bg-[#0A1310]/85 backdrop-blur-md text-slate-800 dark:text-[#EAEFE9] border border-[#E7E2D6] dark:border-white/10 shadow-xs">
            {item.category?.name || 'Gear'}
          </span>
          {item.condition && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-primary/20 dark:bg-brand-primary/30 backdrop-blur-md text-brand-primary dark:text-brand-secondary border border-brand-primary/30">
              {item.condition}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            wishlisted
              ? 'bg-[#C96F52] text-white shadow-md shadow-[#C96F52]/40 scale-105'
              : 'bg-white/85 dark:bg-[#0A1310]/75 text-slate-600 dark:text-slate-200 hover:text-[#C96F52] hover:bg-white dark:hover:bg-[#14211D] hover:scale-110'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Live Availability Bar */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#0A1310]/90 backdrop-blur-md border border-emerald-500/30 text-[10px] text-emerald-800 dark:text-emerald-300 font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available Now
        </div>

        <div className="item-card-meta absolute bottom-3 right-3 z-10 flex items-center gap-1.5 text-white">
          <span className="text-xs font-extrabold drop-shadow-md bg-black/40 px-2 py-0.5 rounded-lg backdrop-blur-xs">{formatINR(item.pricePerDay)}<span className="font-normal text-[10px] text-white/80"> / day</span></span>
          {item.owner?.isVerified && <ShieldCheck className="w-4 h-4 text-[#D8EEE3] drop-shadow-md" aria-label="Verified lender" />}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-white dark:bg-[#111E1A]">
        <div>
          {/* Title */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-sm line-clamp-2 text-slate-900 dark:text-[#F8F6F0] group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Rating & Location */}
          <div className="flex items-center justify-between text-xs text-[#52635B] dark:text-[#A8C8B5] mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-800 dark:text-[#F8F6F0]">{item.rating?.toFixed(1) || '4.8'}</span>
              <span className="text-[11px] text-[#82938B] dark:text-[#7D9B8E]">({item.numReviews || 0})</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] truncate max-w-[130px] font-medium">
              <MapPin className="w-3 h-3 text-brand-primary dark:text-brand-secondary shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#EAE6DC] dark:border-[#1E332B] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#82938B] dark:text-[#7D9B8E] font-bold">Rent for</div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold font-display text-brand-primary dark:text-brand-secondary">
                {formatINR(item.pricePerDay)}
              </span>
              <span className="text-xs text-[#82938B] dark:text-[#7D9B8E]">/day</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.owner?.avatar && (
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-7 h-7 rounded-full border-2 border-brand-primary/20 dark:border-white/10 object-cover shadow-xs"
                title={`Lender: ${item.owner.name}`}
              />
            )}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] font-medium text-[#52635B] dark:text-[#7D9B8E] max-w-[70px] truncate">
                {item.owner?.name || 'Local lender'}
              </span>
              <span className="item-card-action inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-xs">
                Rent
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link to={`/items/${item._id}`} className="interactive-card block h-full">
      {isFeatured ? <TiltCard className="h-full">{cardContent}</TiltCard> : cardContent}
    </Link>
  );
};

export default ItemCard;
