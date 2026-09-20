import Rental from '../models/Rental.js';
import Item from '../models/Item.js';
import Notification from '../models/Notification.js';

// @desc    Create rental request
// @route   POST /api/rentals
// @access  Private
export const createRental = async (req, res, next) => {
  try {
    const { itemId, startDate, endDate, deliveryOption, borrowerNote } = req.body;

    if (!itemId || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Please provide itemId, startDate and endDate' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ success: false, message: 'This item is currently unavailable for rent' });
    }

    // Cannot rent your own item
    if (item.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot rent your own item' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ success: false, message: 'End date must be after start date' });
    }

    // Check date overlap against Approved/Active rentals
    const existingBooking = await Rental.findOne({
      item: itemId,
      status: { $in: ['Approved', 'Active'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'The requested dates are already booked for this item. Please select different dates.'
      });
    }

    // Calculate days and amounts
    const diffTime = Math.abs(end - start);
    const numberOfDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const pricePerDay = item.pricePerDay;
    const rentalFee = numberOfDays * pricePerDay;
    const securityDeposit = item.securityDeposit || 0;
    const totalAmount = rentalFee + securityDeposit;

    const rental = await Rental.create({
      item: itemId,
      borrower: req.user._id,
      owner: item.owner,
      startDate: start,
      endDate: end,
      numberOfDays,
      pricePerDay,
      securityDeposit,
      rentalFee,
      totalAmount,
      deliveryOption: deliveryOption || 'Self Pickup',
      borrowerNote: borrowerNote || '',
      pickupLocation: item.location,
      status: 'Pending'
    });

    // Notify item owner
    await Notification.create({
      user: item.owner,
      title: 'New Rental Request Received',
      message: `${req.user.name} has requested to rent "${item.title}" from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}.`,
      type: 'rental_request',
      relatedItem: item._id,
      relatedRental: rental._id
    });

    const populatedRental = await Rental.findById(rental._id)
      .populate('item', 'title images pricePerDay securityDeposit location')
      .populate('owner', 'name avatar location phone rating')
      .populate('borrower', 'name avatar location rating');

    res.status(201).json({
      success: true,
      message: 'Rental request submitted successfully! Pending owner approval.',
      rental: populatedRental
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's borrowed rentals
// @route   GET /api/rentals/my
// @access  Private
export const getMyRentals = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { borrower: req.user._id };
    if (status && status !== 'All') {
      query.status = status;
    }

    const rentals = await Rental.find(query)
      .populate('item', 'title images pricePerDay securityDeposit location category')
      .populate('owner', 'name avatar location phone rating isVerified')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rentals.length,
      rentals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get owner's incoming rental requests & items being rented out
// @route   GET /api/rentals/requests
// @access  Private
export const getOwnerRentals = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { owner: req.user._id };
    if (status && status !== 'All') {
      query.status = status;
    }

    const rentals = await Rental.find(query)
      .populate('item', 'title images pricePerDay securityDeposit location')
      .populate('borrower', 'name email avatar location phone rating isVerified')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rentals.length,
      rentals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve rental request
// @route   PUT /api/rentals/:id/approve
// @access  Private (Owner only)
export const approveRental = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('item');
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental request not found' });
    }

    if (rental.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only the item owner can approve this request' });
    }

    if (rental.status !== 'Pending') {
      return res.status(400).json({ success: false, message: `Cannot approve request with status '${rental.status}'` });
    }

    rental.status = 'Approved';
    await rental.save();

    // Notify borrower
    await Notification.create({
      user: rental.borrower,
      title: 'Rental Request Approved! 🎉',
      message: `Your rental request for "${rental.item.title}" has been approved! You can coordinate pickup.`,
      type: 'rental_approved',
      relatedItem: rental.item._id,
      relatedRental: rental._id
    });

    res.status(200).json({
      success: true,
      message: 'Rental approved successfully',
      rental
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject rental request
// @route   PUT /api/rentals/:id/reject
// @access  Private (Owner only)
export const rejectRental = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const rental = await Rental.findById(req.params.id).populate('item');
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental request not found' });
    }

    if (rental.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only the item owner can reject this request' });
    }

    rental.status = 'Rejected';
    rental.rejectionReason = reason || 'Owner unavailable for the selected dates';
    await rental.save();

    // Notify borrower
    await Notification.create({
      user: rental.borrower,
      title: 'Rental Request Declined',
      message: `Your rental request for "${rental.item.title}" was declined: ${rental.rejectionReason}`,
      type: 'rental_rejected',
      relatedItem: rental.item._id,
      relatedRental: rental._id
    });

    res.status(200).json({
      success: true,
      message: 'Rental rejected',
      rental
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel rental request
// @route   PUT /api/rentals/:id/cancel
// @access  Private (Borrower or Owner)
export const cancelRental = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('item');
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental not found' });
    }

    const isBorrower = rental.borrower.toString() === req.user._id.toString();
    const isOwner = rental.owner.toString() === req.user._id.toString();

    if (!isBorrower && !isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this rental' });
    }

    if (['Completed', 'Cancelled', 'Rejected'].includes(rental.status)) {
      return res.status(400).json({ success: false, message: `Rental is already ${rental.status}` });
    }

    rental.status = 'Cancelled';
    await rental.save();

    // Notify the other party
    const targetUserId = isBorrower ? rental.owner : rental.borrower;
    await Notification.create({
      user: targetUserId,
      title: 'Rental Cancelled',
      message: `The rental for "${rental.item.title}" has been cancelled.`,
      type: 'system',
      relatedItem: rental.item._id,
      relatedRental: rental._id
    });

    res.status(200).json({
      success: true,
      message: 'Rental cancelled successfully',
      rental
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete rental (mark returned)
// @route   PUT /api/rentals/:id/complete
// @access  Private (Owner only)
export const completeRental = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('item');
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental not found' });
    }

    if (rental.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only owner can mark rental completed' });
    }

    rental.status = 'Completed';
    await rental.save();

    // Notify borrower to write a review
    await Notification.create({
      user: rental.borrower,
      title: 'Rental Completed! How was your experience? ⭐',
      message: `"${rental.item.title}" has been marked as returned. Leave a review to help the community!`,
      type: 'rental_completed',
      relatedItem: rental.item._id,
      relatedRental: rental._id
    });

    res.status(200).json({
      success: true,
      message: 'Rental marked as completed',
      rental
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booked date ranges for an item
// @route   GET /api/rentals/item/:itemId/booked-dates
// @access  Public
export const getItemBookedDates = async (req, res, next) => {
  try {
    const rentals = await Rental.find({
      item: req.params.itemId,
      status: { $in: ['Approved', 'Active'] },
      endDate: { $gte: new Date() }
    }).select('startDate endDate');

    const bookedRanges = rentals.map((r) => ({
      startDate: r.startDate,
      endDate: r.endDate
    }));

    res.status(200).json({
      success: true,
      bookedRanges
    });
  } catch (error) {
    next(error);
  }
};
