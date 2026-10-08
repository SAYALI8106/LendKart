import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/marketplace/ItemCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, loading } = useWishlist();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#14211D] rounded-3xl border border-[#E5E0D2] dark:border-white/10 shadow-soft-md space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#C96F52]/10 text-[#C96F52] flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Sign In to View Your Saved Gear
        </h2>
        <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
          Save high-demand items for your upcoming trips, events, or studio projects.
        </p>
        <Button
          onClick={() => navigate('/login?redirect=/wishlist')}
          variant="primary"
          size="md"
          className="w-full !rounded-xl !bg-[#176B52] font-bold"
        >
          Sign In Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEO
        title="Saved Gear Wishlist — LendKart"
        description="View and manage the equipment you have saved for upcoming projects on LendKart."
      />

      <div className="pb-4 border-b border-[#E5E0D2] dark:border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
            Personal Collection
          </span>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white mt-0.5">
            My Saved Equipment ({wishlistItems.length})
          </h1>
          <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] mt-0.5">
            Equipment bookmarked for upcoming shoots, terrace screenings, and outdoor adventures.
          </p>
        </div>
        <Link
          to="/explore"
          className="text-xs font-bold text-[#176B52] dark:text-[#A8C8B5] hover:underline flex items-center gap-1"
        >
          <span>Find More Gear</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No items saved yet"
          description="Explore our community catalog and tap the heart icon on any camera, projector, or tent to save it here."
          actionLabel="Explore Gear Catalog"
          onAction={() => navigate('/explore')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
