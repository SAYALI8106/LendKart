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

  return (
    <Link
      to={`/explore?category=${category.slug}`}
      className="glass-card group p-5 rounded-2xl border border-white/5 hover:border-brand-primary/40 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
    >
      {/* Ambient background glow on hover */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-brand-primary/10 blur-xl group-hover:bg-brand-primary/20 transition-all duration-500" />

      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 group-hover:text-brand-secondary transition-colors">
          {category.itemCount || 0} items
        </span>
      </div>

      <div>
        <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors mb-1 font-display">
          {category.name}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
