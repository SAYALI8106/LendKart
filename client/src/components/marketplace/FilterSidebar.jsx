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
    <div className="bg-white dark:bg-[#14211D] p-5 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D6] dark:border-[#1E332B]">
        <div className="flex items-center gap-2 font-bold font-display text-sm text-[#17201D] dark:text-[#F8F6F0]">
          <Filter className="w-4 h-4 text-[#176B52] dark:text-[#8EAFA0]" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#788880] dark:text-[#7D9B8E] hover:text-[#176B52] dark:hover:text-[#8EAFA0] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] mb-2.5">
          Categories
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <div
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#176B52] text-white font-medium shadow-xs'
                : 'text-[#5C6E66] dark:text-[#A8C8B5] hover:bg-[#F8F6F0] dark:hover:bg-[#1E332B]'
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
                  ? 'bg-[#176B52] text-white font-medium shadow-xs'
                  : 'text-[#5C6E66] dark:text-[#A8C8B5] hover:bg-[#F8F6F0] dark:hover:bg-[#1E332B]'
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
          <label className="text-xs font-bold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E]">
            Max Daily Price
          </label>
          <span className="text-xs font-bold text-[#176B52] dark:text-[#8EAFA0]">
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
          className="w-full h-1.5 bg-[#E7E2D6] dark:bg-[#1E332B] rounded-lg appearance-none cursor-pointer accent-[#176B52]"
        />
        <div className="flex justify-between text-[10px] text-[#788880] dark:text-[#7D9B8E] mt-1">
          <span>₹100</span>
          <span>₹2,000+</span>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="w-3.5 h-3.5 text-[#788880] absolute left-3 top-2.5" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52] cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-white dark:bg-[#14211D] text-[#17201D] dark:text-[#F8F6F0]">
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] mb-2">
          Item Condition
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((cond) => (
            <button
              key={cond}
              onClick={() => onConditionChange(cond)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                selectedCondition === cond
                  ? 'bg-[#176B52]/15 text-[#176B52] dark:text-[#8EAFA0] border border-[#176B52]/30 font-medium'
                  : 'bg-[#F4F1EA] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] border border-[#E7E2D6] dark:border-[#1E332B] hover:border-[#176B52]/40'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] mb-2">
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                minRating === rating
                  ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold'
                  : 'bg-[#F4F1EA] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] border border-[#E7E2D6] dark:border-[#1E332B] hover:border-amber-400/40'
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
