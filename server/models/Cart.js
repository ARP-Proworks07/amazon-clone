const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1']
        },
        price: {
          type: Number,
          required: true
        },
        name: String,
        image: String
      }
    ],
    totalPrice: {
      type: Number,
      default: 0
    },
    totalItems: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to calculate totals
CartSchema.pre('save', function(next) {
  // Calculate total price and total items
  let totalPrice = 0;
  let totalItems = 0;
  
  this.items.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });
  
  this.totalPrice = totalPrice;
  this.totalItems = totalItems;
  
  next();
});

module.exports = mongoose.model('Cart', CartSchema);
