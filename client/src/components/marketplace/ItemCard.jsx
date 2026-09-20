import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, ShieldCheck, Star } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';
import TiltCard from '../3d/TiltCard';

export const ItemCard = ({ item, isFeatured = false }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(item._id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item);
  };

  const cardContent = (
    <div className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full border border-white/5 hover:border-brand-primary/40 transition-all duration-300">
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/50">
        <img
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex gap-1.5 items-center">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-slate-950/70 backdrop-blur-md text-slate-200 border border-white/10">
            {item.category?.name || 'Gear'}
          </span>
          {item.condition && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-primary/30 backdrop-blur-md text-brand-primary border border-brand-primary/40">
              {item.condition}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110'
              : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900/90'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Live Availability Bar */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/70 backdrop-blur-md border border-emerald-500/30 text-[10px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available Now
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-sm line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-brand-primary transition-colors">
              {item.title}
            </h3>
          </div>

          {/* Rating & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-medium text-slate-800 dark:text-slate-200">{item.rating?.toFixed(1) || '4.8'}</span>
              <span className="text-[11px]">({item.numReviews || 0})</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] truncate max-w-[120px]">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Rent for</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-display text-slate-900 dark:text-white">
                {formatINR(item.pricePerDay)}
              </span>
              <span className="text-xs text-slate-400">/day</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {item.owner?.avatar && (
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-6 h-6 rounded-full border border-white/20 object-cover"
                title={`Lender: ${item.owner.name}`}
              />
            )}
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-white transition-all">
              Rent
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link to={`/items/${item._id}`} className="block h-full">
      {isFeatured ? <TiltCard>{cardContent}</TiltCard> : cardContent}
    </Link>
  );
};

export default ItemCard;
