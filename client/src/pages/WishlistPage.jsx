import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
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
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#14211D] rounded-2xl border border-sand-300 dark:border-[#1E332B] shadow-soft-md space-y-4">
        <div className="w-12 h-12 rounded-full bg-terracotta-500/10 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-serif text-charcoal-900 dark:text-sand-100">
          Sign In to View Your Wishlist
        </h2>
        <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
          Save high-demand items for your upcoming trips, events, or studio projects.
        </p>
        <Button
          onClick={() => navigate('/login?redirect=/wishlist')}
          variant="primary"
          size="md"
          className="w-full"
        >
          Sign In Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEO
        title="Saved Gear Wishlist"
        description="View and manage the items you have saved for upcoming projects on LendKart."
      />

      <div className="pb-4 border-b border-sand-300 dark:border-[#1E332B]">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-charcoal-900 dark:text-sand-100">
          My Saved Wishlist ({wishlistItems.length})
        </h1>
        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
          Items bookmarked for future trips, photo shoots, and events.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet."
          description="Save gear you might want to rent later so you can easily find it when your event arrives."
          actionLabel="Explore Items"
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
