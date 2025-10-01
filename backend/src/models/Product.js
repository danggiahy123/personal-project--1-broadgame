const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  images: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    required: true,
    enum: ['board-game', 'card-game', 'puzzle', 'strategy', 'family', 'party']
  },
  brand: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isInStock: {
    type: Boolean,
    default: true
  },
  isFlashSale: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  specifications: {
    players: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: 4 }
    },
    age: {
      min: { type: Number, default: 3 },
      max: { type: Number, default: 99 }
    },
    duration: {
      type: Number, // in minutes
      default: 30
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  sales: {
    totalSold: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFlashSale: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isInStock: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ 'sales.totalSold': -1 });

// Virtual for discount percentage calculation
productSchema.virtual('calculatedDiscount').get(function() {
  if (this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Pre-save middleware to update discount percentage
productSchema.pre('save', function(next) {
  if (this.originalPrice > this.price) {
    this.discountPercentage = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  } else {
    this.discountPercentage = 0;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
