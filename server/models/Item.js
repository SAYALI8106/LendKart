import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an item title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide item description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please specify category']
    },
    categorySlug: {
      type: String,
      lowercase: true
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one photo'],
      validate: [val => val.length > 0, 'Item must have at least one image']
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Please specify daily rental price in INR'],
      min: [10, 'Price must be at least ₹10/day']
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: [0, 'Security deposit cannot be negative']
    },
    condition: {
      type: String,
      enum: ['Like New', 'Excellent', 'Good', 'Fair'],
      default: 'Excellent'
    },
    location: {
      type: String,
      required: [true, 'Please specify item location/city'],
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    rentalRules: {
      type: [String],
      default: [
        'Valid ID verification required upon pickup',
        'Return in original condition and packaging',
        'Late returns incur additional daily charges'
      ]
    },
    specifications: [
      {
        key: String,
        value: String
      }
    ],
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'paused', 'flagged'],
      default: 'available'
    },
    featured: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Search indexing for high-speed queries
itemSchema.index({ title: 'text', description: 'text', location: 'text' });

export default mongoose.model('Item', itemSchema);
