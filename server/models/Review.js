import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    rental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rental'
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required (1-5)'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Please write a review comment'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    images: [String]
  },
  {
    timestamps: true
  }
);

// Prevent duplicate review per rental by same reviewer
reviewSchema.index({ rental: 1, reviewer: 1 }, { unique: true, sparse: true });

export default mongoose.model('Review', reviewSchema);
