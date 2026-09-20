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
      className="bg-white dark:bg-[#14211D] group p-5 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] hover:border-brand-primary/50 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5"
    >
      {/* Subtle warm hover accent */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#176B52]/5 group-hover:bg-[#176B52]/15 blur-xl transition-all duration-500" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#176B52]/10 dark:bg-[#176B52]/20 border border-[#176B52]/20 flex items-center justify-center text-[#176B52] dark:text-[#8EAFA0] group-hover:scale-105 group-hover:bg-[#176B52] group-hover:text-white transition-all duration-300 shadow-xs">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F4F1EA] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] border border-[#E7E2D6] dark:border-[#1E332B] group-hover:border-[#176B52]/30 transition-colors">
          {category.itemCount || 0} items
        </span>
      </div>

      <div className="relative z-10">
        <h4 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] group-hover:text-[#176B52] dark:group-hover:text-[#8EAFA0] transition-colors mb-1 font-display">
          {category.name}
        </h4>
        <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
