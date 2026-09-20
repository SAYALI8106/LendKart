import Wishlist from '../models/Wishlist.js';
import Item from '../models/Item.js';

// @desc    Get current user's wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
  try {
    const wishlistItems = await Wishlist.find({ user: req.user._id })
      .populate({
        path: 'item',
        populate: [
          { path: 'owner', select: 'name avatar location rating isVerified' },
          { path: 'category', select: 'name slug icon' }
        ]
      })
      .sort({ createdAt: -1 });

    const items = wishlistItems
      .filter((w) => w.item !== null)
      .map((w) => w.item);

    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle wishlist item (add or remove)
// @route   POST /api/wishlist/:itemId
// @access  Private
export const toggleWishlist = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const existing = await Wishlist.findOne({ user: req.user._id, item: itemId });

    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      return res.status(200).json({
        success: true,
        isWishlisted: false,
        message: 'Removed from wishlist'
      });
    } else {
      await Wishlist.create({ user: req.user._id, item: itemId });
      return res.status(201).json({
        success: true,
        isWishlisted: true,
        message: 'Added to wishlist'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Check if item is in user's wishlist
// @route   GET /api/wishlist/check/:itemId
// @access  Private
export const checkWishlistStatus = async (req, res, next) => {
  try {
    const existing = await Wishlist.findOne({ user: req.user._id, item: req.params.itemId });
    res.status(200).json({
      success: true,
      isWishlisted: !!existing
    });
  } catch (error) {
    next(error);
  }
};
