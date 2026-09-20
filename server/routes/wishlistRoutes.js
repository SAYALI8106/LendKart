import express from 'express';
import { getWishlist, toggleWishlist, checkWishlistStatus } from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/:itemId', protect, toggleWishlist);
router.get('/check/:itemId', protect, checkWishlistStatus);

export default router;
