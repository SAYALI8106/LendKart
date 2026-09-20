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
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-center gap-2"
      >
        {/* Item Search Input */}
        <div className="relative flex-1 flex items-center w-full px-3 py-2 border-b md:border-b-0 md:border-r border-white/10">
          <Search className="w-5 h-5 text-brand-primary shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="What do you need? (e.g. Projector, Camera, Drill)"
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center w-full md:w-48 px-3 py-2 border-b md:border-b-0 md:border-r border-white/10">
          <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mr-2.5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-slate-900 text-white">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selector Mock / Prompt representation */}
        <div className="hidden lg:flex items-center px-3 py-2 text-xs sm:text-sm text-slate-400 cursor-pointer hover:text-white transition-colors">
          <Calendar className="w-4 h-4 text-brand-accent shrink-0 mr-2" />
          <span>Flexible Dates</span>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-primary to-brand-primaryHover text-white font-semibold text-sm shadow-lg shadow-brand-primary/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <span>Search</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Instant Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40 glass-panel rounded-2xl border border-white/15 shadow-2xl p-2 max-h-64 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
            Suggested Items
          </div>
          {filteredSuggestions.map((item, idx) => (
            <div
              key={item}
              onClick={() => {
                setQuery(item);
                triggerSearch(item);
              }}
              className={`px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors flex items-center justify-between ${
                selectedIndex === idx
                  ? 'bg-brand-primary/20 text-brand-primary font-medium'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>{item}</span>
              </div>
              <span className="text-[11px] text-emerald-400">Available</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
