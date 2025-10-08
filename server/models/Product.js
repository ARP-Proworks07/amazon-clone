const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be positive']
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be positive']
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required']
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      index: true
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
      index: true
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    ratings: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isOnSale: {
      type: Boolean,
      default: false
    },
    discountPercentage: {
      type: Number,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
      default: 0
    },
    specifications: {
      type: Map,
      of: String
    }
  },
  {
    timestamps: true
  }
);

// Add text index for search functionality
ProductSchema.index({
  name: 'text',
  description: 'text',
  brand: 'text',
  category: 'text'
});

module.exports = mongoose.model('Product', ProductSchema);
