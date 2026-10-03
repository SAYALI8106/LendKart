import React from 'react';
import { Filter, RotateCcw, Star, IndianRupee, MapPin } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

const CONDITIONS = ['All', 'Like New', 'Excellent', 'Good', 'Fair'];
const LOCATIONS = [
  'All',
  'Pune',
  'Mumbai',
  'Nashik',
  'Chhatrapati Sambhajinagar',
  'Bengaluru',
  'Nagpur',
  'New Delhi'
];

export const FilterSidebar = ({
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
  priceRange = [0, 2000],
  onPriceChange,
  selectedLocation = 'All',
  onLocationChange,
  selectedCondition = 'All',
  onConditionChange,
  minRating = 0,
  onRatingChange,
  onReset
}) => {
  return (
    <div className="bg-white/90 dark:bg-[#111E1A]/90 p-5 sm:p-6 rounded-3xl border border-[#E6E1D5] dark:border-white/10 shadow-soft-md space-y-6 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E6E1D5] dark:border-white/10">
        <div className="flex items-center gap-2 font-extrabold font-display text-sm text-slate-900 dark:text-[#F8F6F0]">
          <Filter className="w-4 h-4 text-brand-primary dark:text-brand-secondary" />
          <span>Refine Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-slate-500 dark:text-[#7D9B8E] hover:text-brand-primary dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#7D9B8E] mb-2.5">
          Gear Category
        </label>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          <div
            onClick={() => onCategoryChange('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-between transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-primary text-white shadow-soft-sm scale-[1.02]'
                : 'text-slate-700 dark:text-[#A8C8B5] hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span>All Categories</span>
          </div>
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-between transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-brand-primary text-white font-bold shadow-soft-sm scale-[1.02]'
                  : 'text-slate-700 dark:text-[#A8C8B5] hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <span className="truncate">{cat.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${selectedCategory === cat.slug ? 'bg-white/20 text-white' : 'bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>
                {cat.itemCount || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#7D9B8E]">
            Max Daily Rate
          </label>
          <span className="text-xs font-extrabold text-brand-primary dark:text-brand-secondary bg-brand-primary/10 dark:bg-brand-primary/20 px-2.5 py-0.5 rounded-full">
            {formatINR(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-slate-200 dark:bg-[#0A1310] rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-[#7D9B8E] mt-1.5">
          <span>₹100/day</span>
          <span>₹2,000+/day</span>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#7D9B8E] mb-2">
          Metro City Location
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-brand-primary dark:text-brand-secondary absolute left-3 top-2.5" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/10 text-xs font-bold text-slate-900 dark:text-[#F8F6F0] focus:outline-none focus:border-brand-primary cursor-pointer shadow-xs"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-white dark:bg-[#111E1A] text-slate-900 dark:text-[#F8F6F0]">
                📍 {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#7D9B8E] mb-2">
          Equipment Condition
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((cond) => (
            <button
              key={cond}
              onClick={() => onConditionChange(cond)}
              className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer font-semibold ${
                selectedCondition === cond
                  ? 'bg-brand-primary/15 text-brand-primary dark:text-brand-secondary border border-brand-primary/30 font-bold scale-[1.03]'
                  : 'bg-slate-100 dark:bg-[#0A1310] text-slate-700 dark:text-[#A8C8B5] border border-[#E6E1D5] dark:border-white/10 hover:border-brand-primary/40'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#7D9B8E] mb-2">
          Minimum Lender Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                minRating === rating
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-extrabold scale-[1.03]'
                  : 'bg-slate-100 dark:bg-[#0A1310] text-slate-700 dark:text-[#A8C8B5] border border-[#E6E1D5] dark:border-white/10 hover:border-amber-400/40'
              }`}
            >
              {rating === 0 ? (
                'All'
              ) : (
                <>
                  <span>{rating}</span>
                  <Star className="w-3 h-3 fill-current text-amber-500" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
