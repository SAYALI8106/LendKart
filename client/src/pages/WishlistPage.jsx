import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/marketplace/ItemCard';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/common/SEO';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, loading } = useWishlist();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center glass-card rounded-3xl space-y-4">
        <Heart className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
        <h2 className="text-xl font-bold font-display text-white">Sign In to View Your Wishlist</h2>
        <p className="text-xs text-slate-400">
          Save high-demand items for your upcoming trips, events, or studio projects.
        </p>
        <button
          onClick={() => navigate('/login?redirect=/wishlist')}
          className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEO
        title="Saved Gear Wishlist"
        description="View and manage the items you have saved for upcoming projects on LendKart."
      />

      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          My Saved Wishlist ({wishlistItems.length})
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Items bookmarked for future trips, photo shoots, and events.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
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
