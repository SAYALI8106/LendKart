import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['rental_request', 'rental_approved', 'rental_rejected', 'rental_active', 'rental_completed', 'review_received', 'system'],
      default: 'system'
    },
    relatedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    relatedRental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rental'
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);
