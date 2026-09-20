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
    <div className="bg-white dark:bg-[#14211D] rounded-2xl overflow-hidden group flex flex-col h-full border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm hover:shadow-soft-md hover:border-brand-primary/50 transition-all duration-300">
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9] dark:bg-[#0E1714]">
        <img
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Category & Condition Pill */}
        <div className="absolute top-3 left-3 flex gap-1.5 items-center">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/90 dark:bg-[#0E1714]/85 backdrop-blur-md text-[#17201D] dark:text-[#EAEFE9] border border-[#E7E2D6] dark:border-white/10 shadow-xs">
            {item.category?.name || 'Gear'}
          </span>
          {item.condition && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#176B52]/15 dark:bg-[#176B52]/30 backdrop-blur-md text-[#176B52] dark:text-[#A8C8B5] border border-[#176B52]/30">
              {item.condition}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? 'bg-[#C96F52] text-white shadow-md shadow-[#C96F52]/30 scale-105'
              : 'bg-white/80 dark:bg-[#0E1714]/75 text-[#5C6E66] dark:text-[#A8C8B5] hover:text-[#C96F52] hover:bg-white dark:hover:bg-[#14211D]'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Live Availability Bar */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#0E1714]/90 backdrop-blur-md border border-emerald-500/30 text-[10px] text-emerald-800 dark:text-emerald-300 font-medium shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available Now
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-sm line-clamp-2 text-[#17201D] dark:text-[#F8F6F0] group-hover:text-[#176B52] dark:group-hover:text-[#8EAFA0] transition-colors leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Rating & Location */}
          <div className="flex items-center justify-between text-xs text-[#5C6E66] dark:text-[#A8C8B5] mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-[#17201D] dark:text-[#F8F6F0]">{item.rating?.toFixed(1) || '4.8'}</span>
              <span className="text-[11px] text-[#788880] dark:text-[#7D9B8E]">({item.numReviews || 0})</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] truncate max-w-[120px]">
              <MapPin className="w-3 h-3 text-[#788880] dark:text-[#7D9B8E] shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 border-t border-[#EAE6DC] dark:border-[#1E332B] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] font-medium">Rent for</div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold font-display text-[#176B52] dark:text-[#8EAFA0]">
                {formatINR(item.pricePerDay)}
              </span>
              <span className="text-xs text-[#788880] dark:text-[#7D9B8E]">/day</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {item.owner?.avatar && (
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-6 h-6 rounded-full border border-[#E7E2D6] dark:border-[#1E332B] object-cover"
                title={`Lender: ${item.owner.name}`}
              />
            )}
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#176B52]/10 dark:bg-[#176B52]/20 text-[#176B52] dark:text-[#8EAFA0] border border-[#176B52]/20 group-hover:bg-[#176B52] group-hover:text-white transition-all">
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
