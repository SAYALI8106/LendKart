import React from 'react';
import { Link } from 'react-router-dom';
import {
  Tv,
  Camera,
  Wrench,
  Tent,
  Gamepad2,
  Music,
  Trophy,
  Sparkles,
  Package,
  ArrowUpRight,
  Luggage,
  Home
} from 'lucide-react';

const iconMap = {
  Tv,
  Camera,
  Wrench,
  Tent,
  Gamepad2,
  Music,
  Trophy,
  Sparkles,
  Luggage,
  Home
};

export const CategoryCard = ({ category, variant = 'default', className = '' }) => {
  const IconComponent = iconMap[category.icon] || Package;
  const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

  const isWide = variant === 'wide';
  const isTall = variant === 'tall';

  return (
    <Link
      to={`/explore?category=${category.slug}`}
      data-cursor="EXPLORE"
      className={`interactive-card group relative rounded-3xl overflow-hidden border border-[#E5E0D2] dark:border-white/10 flex flex-col justify-end transition-all duration-500 shadow-soft-sm hover:shadow-xl hover:border-[#176B52]/50 ${
        isWide
          ? 'min-h-[290px] sm:min-h-[320px]'
          : isTall
          ? 'min-h-[340px] sm:min-h-[380px]'
          : 'min-h-[240px] sm:min-h-[260px]'
      } ${className}`}
    >
      {/* Background Photography with Zoom Effect */}
      <img
        src={category.image || fallbackImage}
        alt={category.name}
        className="category-image absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.88] contrast-[1.05]"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
        }}
      />

      {/* Layered Editorial Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1714]/95 via-[#0E1714]/50 to-transparent transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#176B52]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full">
        {/* Top Header Pill Bar */}
        <div className="flex items-center justify-between mb-auto pb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#176B52] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
            <IconComponent className="w-5 h-5 text-white" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-xs">
              {category.itemCount || '4+'} verified items
            </span>
            <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom Text Area */}
        <div className="space-y-1.5 transform group-hover:-translate-y-1 transition-transform duration-300">
          <h4 className="font-bold text-xl sm:text-2xl text-white group-hover:text-emerald-200 transition-colors font-display tracking-tight leading-tight">
            {category.name}
          </h4>
          <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
