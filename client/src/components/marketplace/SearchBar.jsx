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
        className="bg-white dark:bg-[#14211D] p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-md flex flex-col md:flex-row items-center gap-2"
      >
        {/* Item Search Input */}
        <div className="relative flex-1 flex items-center w-full px-3 py-2 border-b md:border-b-0 md:border-r border-[#E7E2D6] dark:border-[#1E332B]">
          <Search className="w-5 h-5 text-[#176B52] dark:text-[#8EAFA0] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="What do you need? (e.g. Projector, Camera, Drill)"
            className="w-full bg-transparent text-sm sm:text-base text-[#17201D] dark:text-[#F8F6F0] placeholder-[#788880] dark:placeholder-[#7D9B8E] focus:outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center w-full md:w-48 px-3 py-2 border-b md:border-b-0 md:border-r border-[#E7E2D6] dark:border-[#1E332B]">
          <MapPin className="w-4 h-4 text-[#8EAFA0] shrink-0 mr-2.5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-[#17201D] dark:text-[#EAEFE9] focus:outline-none cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-white dark:bg-[#14211D] text-[#17201D] dark:text-[#F8F6F0]">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selector Mock / Prompt representation */}
        <div className="hidden lg:flex items-center px-3 py-2 text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5] cursor-pointer hover:text-[#176B52] dark:hover:text-[#F8F6F0] transition-colors">
          <Calendar className="w-4 h-4 text-[#C96F52] shrink-0 mr-2" />
          <span>Flexible Dates</span>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3 rounded-xl sm:rounded-2xl bg-[#176B52] hover:bg-[#125440] text-white font-medium text-sm shadow-soft-sm hover:shadow-soft-md transition-all flex items-center justify-center gap-2 shrink-0 active:scale-98 cursor-pointer"
        >
          <span>Search</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Instant Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white dark:bg-[#14211D] rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-lg p-2 max-h-64 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] px-3 py-1">
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
                  ? 'bg-[#176B52]/10 text-[#176B52] dark:text-[#8EAFA0] font-medium'
                  : 'text-[#17201D] dark:text-[#EAEFE9] hover:bg-[#F8F6F0] dark:hover:bg-[#1E332B]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#788880] dark:text-[#7D9B8E]" />
                <span>{item}</span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Available</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
