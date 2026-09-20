import Review from '../models/Review.js';
import Item from '../models/Item.js';
import User from '../models/User.js';
import Rental from '../models/Rental.js';
import Notification from '../models/Notification.js';

// @desc    Create review for an item
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { itemId, rentalId, rating, comment, images } = req.body;

    if (!itemId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide itemId, rating and comment' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (item.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot review your own item' });
    }

    // Check if user already reviewed this rental
    if (rentalId) {
      const existing = await Review.findOne({ rental: rentalId, reviewer: req.user._id });
      if (existing) {
        return res.status(400).json({ success: false, message: 'You have already reviewed this rental' });
      }
    }

    const review = await Review.create({
      item: itemId,
      rental: rentalId || null,
      reviewer: req.user._id,
      rating: Number(rating),
      comment,
      images: images || []
    });

    // Recalculate item rating & review count
    const itemReviews = await Review.find({ item: itemId });
    const avgRating = itemReviews.reduce((acc, r) => acc + r.rating, 0) / itemReviews.length;

    await Item.findByIdAndUpdate(itemId, {
      rating: parseFloat(avgRating.toFixed(1)),
      numReviews: itemReviews.length
    });

    // Also update owner rating
    const ownerItems = await Item.find({ owner: item.owner });
    const ownerItemIds = ownerItems.map((i) => i._id);
    const allOwnerReviews = await Review.find({ item: { $in: ownerItemIds } });
    if (allOwnerReviews.length > 0) {
      const ownerAvg = allOwnerReviews.reduce((acc, r) => acc + r.rating, 0) / allOwnerReviews.length;
      await User.findByIdAndUpdate(item.owner, {
        rating: parseFloat(ownerAvg.toFixed(1)),
        reviewsCount: allOwnerReviews.length
      });
    }

    // Notify item owner
    await Notification.create({
      user: item.owner,
      title: 'New Review Received! ⭐',
      message: `${req.user.name} rated "${item.title}" ${rating} stars: "${comment.slice(0, 50)}..."`,
      type: 'review_received',
      relatedItem: item._id
    });

    const populatedReview = await Review.findById(review._id).populate(
      'reviewer',
      'name avatar location isVerified'
    );

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      review: populatedReview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for an item
// @route   GET /api/reviews/item/:id
// @access  Public
export const getItemReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ item: req.params.id })
      .populate('reviewer', 'name avatar location rating isVerified')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    next(error);
  }
};
