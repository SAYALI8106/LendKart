import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startDate: {
      type: Date,
      required: [true, 'Rental start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'Rental end date is required']
    },
    numberOfDays: {
      type: Number,
      required: true,
      min: 1
    },
    pricePerDay: {
      type: Number,
      required: true
    },
    securityDeposit: {
      type: Number,
      default: 0
    },
    rentalFee: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    deliveryOption: {
      type: String,
      enum: ['Self Pickup', 'Owner Delivery'],
      default: 'Self Pickup'
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    borrowerNote: {
      type: String,
      default: ''
    },
    rejectionReason: {
      type: String,
      default: ''
    },
    pickupLocation: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Compound index for fast queries on item rentals & date overlap searches
rentalSchema.index({ item: 1, startDate: 1, endDate: 1, status: 1 });

export default mongoose.model('Rental', rentalSchema);
