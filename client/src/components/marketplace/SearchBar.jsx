import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Layers, ArrowRight } from 'lucide-react';

const SUGGESTIONS = [
  'Epson 4K Projector',
  'Sony A7 IV Camera',
  'PlayStation 5',
  'Decathlon Camping Tent',
  'Bosch Power Drill',
  'JBL PartyBox Speaker',
  'DJI Mini 3 Pro Drone',
  'Acoustic Guitar'
];

const LOCATIONS = [
  'All Locations',
  'Pune',
  'Mumbai',
  'Nashik',
  'Chhatrapati Sambhajinagar',
  'Bengaluru',
  'Nagpur',
  'New Delhi'
];

export const SearchBar = ({ onSearch, initialSearch = '', initialLocation = 'All Locations' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const matches = SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        e.preventDefault();
        setQuery(filteredSuggestions[selectedIndex]);
        setShowSuggestions(false);
        triggerSearch(filteredSuggestions[selectedIndex]);
      } else {
        triggerSearch(query);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const triggerSearch = (searchQuery) => {
    setShowSuggestions(false);
    const searchVal = searchQuery !== undefined ? searchQuery : query;
    const locVal = location === 'All Locations' ? '' : location;

    if (onSearch) {
      onSearch({ search: searchVal, location: locVal, category });
    } else {
      const params = new URLSearchParams();
      if (searchVal) params.set('search', searchVal);
      if (locVal) params.set('location', locVal);
      if (category && category !== 'all') params.set('category', category);
      navigate(`/explore?${params.toString()}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSearch(query);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto space-y-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 dark:bg-[#111E1A]/90 backdrop-blur-xl p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-[#E6E1D5] dark:border-white/10 shadow-soft-lg flex flex-col md:flex-row items-center gap-2 transition-all duration-300 hover:border-brand-primary/40"
      >
        {/* Item Search Input */}
        <div className="relative flex-1 flex items-center w-full px-3.5 py-2 border-b md:border-b-0 md:border-r border-[#E6E1D5] dark:border-white/10">
          <Search className="w-5 h-5 text-brand-primary dark:text-brand-secondary shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search gear (e.g. 4K Projector, Sony Camera, Tent, Drill)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-[#F8F6F0] placeholder-slate-400 dark:placeholder-[#7D9B8E] focus:outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center w-full md:w-52 px-3.5 py-2 border-b md:border-b-0 md:border-r border-[#E6E1D5] dark:border-white/10">
          <MapPin className="w-4.5 h-4.5 text-brand-secondary shrink-0 mr-2.5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 dark:text-[#EAEFE9] focus:outline-none cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-white dark:bg-[#111E1A] text-slate-900 dark:text-[#F8F6F0]">
                📍 {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selector Mock / Prompt representation */}
        <div className="hidden lg:flex items-center px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-[#A8C8B5] cursor-pointer hover:text-brand-primary dark:hover:text-white transition-colors">
          <Calendar className="w-4 h-4 text-brand-accent shrink-0 mr-2" />
          <span>Dates</span>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-primary to-[#125440] hover:from-[#125440] hover:to-brand-primary text-white font-extrabold text-xs sm:text-sm shadow-forest-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
        >
          <span>Find Gear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Search Chips */}
      <div className="hidden sm:flex items-center gap-2 justify-center text-xs font-semibold text-white/70">
        <span className="text-white/50 text-[11px] uppercase tracking-wider font-bold">Trending:</span>
        {['4K Projector', 'Sony Camera', 'PS5 Console', 'Camping Tent', 'Power Tools'].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              setQuery(chip);
              triggerSearch(chip);
            }}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white text-[11px] transition-all hover:scale-105 cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Instant Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white/95 dark:bg-[#111E1A]/95 backdrop-blur-xl rounded-2xl border border-[#E6E1D5] dark:border-white/10 shadow-soft-lg p-2 max-h-64 overflow-y-auto">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-primary dark:text-brand-secondary px-3 py-1.5">
            Suggested Equipment
          </div>
          {filteredSuggestions.map((item, idx) => (
            <div
              key={item}
              onClick={() => {
                setQuery(item);
                triggerSearch(item);
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                selectedIndex === idx
                  ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-secondary font-bold'
                  : 'text-slate-800 dark:text-[#EAEFE9] hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-3.5 h-3.5 text-brand-primary dark:text-brand-secondary" />
                <span>{item}</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20">Available</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
