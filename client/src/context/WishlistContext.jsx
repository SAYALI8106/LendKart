import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { trackEvent } from '../services/analytics';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/wishlist');
      if (res.data.success) {
        setWishlistItems(res.data.items);
      }
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const isWishlisted = (itemId) => {
    return wishlistItems.some((item) => (item._id || item) === itemId);
  };

  const toggleWishlist = async (item) => {
    if (!isAuthenticated) {
      return { success: false, requireAuth: true };
    }

    const itemId = item._id || item;
    const exists = isWishlisted(itemId);

    // Optimistic UI update
    if (exists) {
      setWishlistItems((prev) => prev.filter((i) => (i._id || i) !== itemId));
    } else {
      setWishlistItems((prev) => [item, ...prev]);
    }

    try {
      const res = await api.post(`/wishlist/${itemId}`);
      if (!exists) {
        trackEvent('wishlist_add', { item_id: itemId });
      }
      return { success: true, isWishlisted: res.data.isWishlisted };
    } catch (err) {
      // Rollback on failure
      fetchWishlist();
      return { success: false, error: err.message };
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isWishlisted,
        toggleWishlist,
        fetchWishlist,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
