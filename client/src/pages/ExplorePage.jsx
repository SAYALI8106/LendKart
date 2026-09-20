import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { itemService } from '../services/itemService';
import ItemCard from '../components/marketplace/ItemCard';
import FilterSidebar from '../components/marketplace/FilterSidebar';
import { ItemCardSkeleton } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/common/SEO';
import Modal from '../components/common/Modal';

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state initialized from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recommended');
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await itemService.getCategories();
        setCategories(cats || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  // Fetch items based on active filters
  const fetchFilteredItems = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 9,
        sort: sortBy
      };

      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedLocation && selectedLocation !== 'All') params.location = selectedLocation;
      if (selectedCondition && selectedCondition !== 'All') params.condition = selectedCondition;
      if (priceRange[1] < 2000) params.maxPrice = priceRange[1];
      if (minRating > 0) params.minRating = minRating;

      const res = await itemService.getItems(params);
      if (res.success) {
        setItems(res.items);
        setTotalPages(res.totalPages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredItems();
  }, [
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedCondition,
    priceRange,
    minRating,
    sortBy,
    currentPage
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('All');
    setSelectedCondition('All');
    setPriceRange([0, 2000]);
    setMinRating(0);
    setSortBy('recommended');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEO
        title="Explore Rental Gear"
        description="Search projectors, cameras, drones, camping tents, and power tools across Indian cities on LendKart."
      />

      {/* Header and Mobile Filter Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E2D6] dark:border-[#1E332B]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">
            Explore Community Gear
          </h1>
          <p className="text-xs text-[#788880] dark:text-[#7D9B8E] mt-1">
            Showing {totalCount} verified items available for rent
          </p>
        </div>

        {/* Sort & Mobile Filter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#14211D] text-xs font-semibold text-[#17201D] dark:text-[#F8F6F0] border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#176B52] dark:text-[#8EAFA0]" />
            <span>Filters</span>
          </button>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#14211D] px-3 py-2 rounded-xl border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#5C6E66] dark:text-[#A8C8B5] shadow-soft-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#176B52] dark:text-[#8EAFA0]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none cursor-pointer"
            >
              <option value="recommended" className="bg-white dark:bg-[#14211D]">Recommended</option>
              <option value="price_asc" className="bg-white dark:bg-[#14211D]">Price: Low to High</option>
              <option value="price_desc" className="bg-white dark:bg-[#14211D]">Price: High to Low</option>
              <option value="rating" className="bg-white dark:bg-[#14211D]">Highest Rated</option>
              <option value="newest" className="bg-white dark:bg-[#14211D]">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Items */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedLocation={selectedLocation}
              onLocationChange={(loc) => {
                setSelectedLocation(loc);
                setCurrentPage(1);
              }}
              selectedCondition={selectedCondition}
              onConditionChange={setSelectedCondition}
              minRating={minRating}
              onRatingChange={setMinRating}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <Modal
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          title="Refine Search"
        >
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedLocation={selectedLocation}
            onLocationChange={(loc) => {
              setSelectedLocation(loc);
              setCurrentPage(1);
            }}
            selectedCondition={selectedCondition}
            onConditionChange={setSelectedCondition}
            minRating={minRating}
            onRatingChange={setMinRating}
            onReset={handleResetFilters}
          />
        </Modal>

        {/* Items Container */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Search Field */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#788880] dark:text-[#7D9B8E] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by keywords, brand, or model..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] text-xs sm:text-sm text-[#17201D] dark:text-[#F8F6F0] placeholder-[#788880] dark:placeholder-[#7D9B8E] shadow-soft-sm focus:outline-none focus:border-[#176B52]"
            />
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ItemCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="No items match your criteria"
              description="Try adjusting your price range, choosing another city, or searching for broader terms."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#176B52] text-white shadow-soft-sm'
                        : 'bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] text-[#5C6E66] dark:text-[#A8C8B5] hover:border-[#176B52]/40'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
