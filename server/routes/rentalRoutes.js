import express from 'express';
import {
  createRental,
  getMyRentals,
  getOwnerRentals,
  approveRental,
  rejectRental,
  cancelRental,
  completeRental,
  getItemBookedDates
} from '../controllers/rentalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createRental);
router.get('/my', protect, getMyRentals);
router.get('/requests', protect, getOwnerRentals);
router.get('/item/:itemId/booked-dates', getItemBookedDates);
router.put('/:id/approve', protect, approveRental);
router.put('/:id/reject', protect, rejectRental);
router.put('/:id/cancel', protect, cancelRental);
router.put('/:id/complete', protect, completeRental);

export default router;
