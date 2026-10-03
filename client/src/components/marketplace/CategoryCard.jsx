import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Camera, Wrench, Tent, Gamepad2, Music, Trophy, Sparkles, Package } from 'lucide-react';

const iconMap = {
  Tv,
  Camera,
  Wrench,
  Tent,
  Gamepad2,
  Music,
  Trophy,
  Sparkles
};

export const CategoryCard = ({ category }) => {
  const IconComponent = iconMap[category.icon] || Package;
  const fallbackImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

  return (
    <Link
      to={`/explore?category=${category.slug}`}
      className="category-image-card interactive-card group min-h-[230px] rounded-2xl border border-white/20 dark:border-white/10 flex flex-col justify-end transition-all duration-300 relative overflow-hidden shadow-soft-sm hover:shadow-forest-glow"
    >
      <img
        src={category.image || fallbackImage}
        alt=""
        className="category-image absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="category-image-overlay absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-white/90 dark:bg-[#0A1310]/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-brand-primary dark:text-brand-secondary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-black/40 text-emerald-200 border border-emerald-400/30 backdrop-blur-md shadow-xs">
            {category.itemCount || 0} gear items
          </span>
        </div>
        <h4 className="font-extrabold text-lg text-white group-hover:text-emerald-200 transition-colors mb-1 font-display">
          {category.name}
        </h4>
        <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
