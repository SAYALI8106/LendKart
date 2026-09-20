import express from 'express';
import {
  getAdminStats,
  getAdminAnalytics,
  getAdminUsers,
  toggleUserSuspension,
  getAdminItems,
  toggleItemStatus,
  getAdminRentals
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Apply protect & adminOnly to all admin routes
router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/analytics', getAdminAnalytics);
router.get('/users', getAdminUsers);
router.put('/users/:id/suspend', toggleUserSuspension);
router.get('/items', getAdminItems);
router.put('/items/:id/status', toggleItemStatus);
router.get('/rentals', getAdminRentals);

export default router;
