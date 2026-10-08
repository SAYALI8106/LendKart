import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  { title: 'Epson 4K Laser Projector', cat: 'Electronics', count: '1080p FHD' },
  { title: 'Sony Alpha A7 IV Cinema Camera', cat: 'Photography', count: '4K Full Frame' },
  { title: 'PlayStation 5 DualSense Bundle', cat: 'Gaming', count: '2 Controllers' },
  { title: 'Decathlon 4-Person Weatherproof Tent', cat: 'Camping', count: 'Waterproof' },
  { title: 'Bosch Professional Cordless Hammer Drill', cat: 'Tools', count: '18V Li-Ion' },
  { title: 'JBL PartyBox 310 High-Power Speaker', cat: 'Audio', count: '240W RMS' },
  { title: 'DJI Mini 3 Pro 4K Drone', cat: 'Photography', count: 'Sub 249g' },
  { title: 'Yamaha F310 Acoustic Guitar', cat: 'Music', count: 'Spruce Top' }
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
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const matches = SUGGESTIONS.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.cat.toLowerCase().includes(query.toLowerCase())
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
        setIsFocused(false);
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
        const selected = filteredSuggestions[selectedIndex].title;
        setQuery(selected);
        setShowSuggestions(false);
        triggerSearch(selected);
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
      onSearch({ search: searchVal, location: locVal });
    } else {
      const params = new URLSearchParams();
      if (searchVal) params.set('search', searchVal);
      if (locVal) params.set('location', locVal);
      navigate(`/explore?${params.toString()}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSearch(query);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto space-y-3.5">
      {/* Editorial Search Eyebrow Prompt */}
      <div className="flex items-center justify-between px-2 text-white/90">
        <label htmlFor="hero-search-input" className="text-xs sm:text-sm font-bold font-display tracking-wide flex items-center gap-2 cursor-pointer">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>What are you looking for?</span>
        </label>
        <span className="hidden sm:inline-block text-[11px] text-white/60 font-medium">
          Instant booking across 10+ categories
        </span>
      </div>

      {/* Modern Search Capsule */}
      <form
        onSubmit={handleSubmit}
        className={`p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white/95 dark:bg-[#111E1A]/95 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_36px_rgba(7,19,16,0.3)] flex flex-col md:flex-row items-center gap-2 ${
          isFocused
            ? 'border-emerald-400 ring-4 ring-emerald-500/20 shadow-forest-glow'
            : 'border-white/30 dark:border-white/10 hover:border-white/60'
        }`}
      >
        {/* Search Query Input */}
        <div className="relative flex-1 flex items-center w-full px-3.5 py-1.5">
          <div className="w-9 h-9 rounded-full bg-[#176B52]/10 dark:bg-[#176B52]/25 flex items-center justify-center shrink-0 mr-3 text-[#176B52] dark:text-[#A8C8B5]">
            <Search className={`w-4 h-4 transition-transform duration-300 ${isFocused ? 'scale-110 text-[#176B52]' : ''}`} />
          </div>
          <input
            id="hero-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (query.trim().length > 1) setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projector, camera, tools, camping..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-[#F8F6F0] placeholder-slate-400 dark:placeholder-[#6C857B] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setShowSuggestions(false);
              }}
              className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-white/10" />

        {/* Location Selector */}
        <div className="flex items-center w-full md:w-48 px-3 py-1.5 rounded-xl md:rounded-none">
          <MapPin className="w-4 h-4 text-[#C96F52] shrink-0 mr-2" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 dark:text-[#EAEFE9] focus:outline-none cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-white dark:bg-[#111E1A] text-slate-900 dark:text-[#F8F6F0]">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3 rounded-xl sm:rounded-full bg-[#176B52] hover:bg-[#125440] text-white font-extrabold text-xs sm:text-sm shadow-soft-sm hover:shadow-forest-glow transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
        >
          <span>Find Gear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Curated Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2 justify-center pt-1 text-xs font-semibold text-white/80">
        <span className="text-white/50 text-[10px] uppercase tracking-wider font-extrabold">Popular:</span>
        {[
          { label: '4K Projectors', query: 'projector' },
          { label: 'DSLR Cameras', query: 'camera' },
          { label: 'Gaming (PS5)', query: 'ps5' },
          { label: 'Trekking Tents', query: 'tent' },
          { label: 'Power Tools', query: 'drill' }
        ].map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => {
              setQuery(chip.query);
              triggerSearch(chip.query);
            }}
            className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white text-[11px] font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 dark:bg-[#111E1A]/95 backdrop-blur-2xl rounded-2xl border border-[#E6E1D5] dark:border-white/10 shadow-2xl p-2 max-h-72 overflow-y-auto"
          >
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] px-3 py-2 border-b border-slate-100 dark:border-white/5">
              Available Local Listings
            </div>
            {filteredSuggestions.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => {
                  setQuery(item.title);
                  triggerSearch(item.title);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                  selectedIndex === idx
                    ? 'bg-[#176B52]/10 text-[#176B52] dark:text-[#A8C8B5] font-bold'
                    : 'text-slate-800 dark:text-[#EAEFE9] hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#176B52]/10 dark:bg-white/10 flex items-center justify-center text-[#176B52] dark:text-emerald-300">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{item.cat} • {item.count}</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20">
                  Ready to Rent
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
