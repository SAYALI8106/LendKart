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
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold font-display text-sm text-slate-900 dark:text-white">
          <Filter className="w-4 h-4 text-brand-primary" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-brand-primary flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Categories
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <div
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-primary text-white font-medium shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>All Categories</span>
          </div>
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-brand-primary text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="truncate">{cat.name}</span>
              <span className="text-[10px] opacity-75">{cat.itemCount || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Max Daily Price
          </label>
          <span className="text-xs font-bold text-brand-accent">
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
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>₹100</span>
          <span>₹2,000+</span>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-primary cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-slate-900">
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Item Condition
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((cond) => (
            <button
              key={cond}
              onClick={() => onConditionChange(cond)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                selectedCondition === cond
                  ? 'bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 font-medium'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors ${
                minRating === rating
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20'
              }`}
            >
              {rating === 0 ? (
                'All'
              ) : (
                <>
                  <span>{rating}</span>
                  <Star className="w-3 h-3 fill-current text-amber-400" />
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
