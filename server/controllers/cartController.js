const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name images price stock');
    
    // If cart doesn't exist, create an empty one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalPrice: 0,
        totalItems: 0
      });
    }
    
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate request
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid product ID and quantity'
      });
    }
    
    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough stock available'
      });
    }
    
    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    
    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
    }
    
    // Check if product is already in cart
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product not in cart, add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0]
      });
    }
    
    // Save cart
    await cart.save();
    
    // Populate product details and return cart
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name images price stock');
    
    res.status(200).json({
      success: true,
      data: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate request
    if (!productId || quantity === undefined || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid product ID and quantity'
      });
    }
    
    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Find item in cart
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    // If item not found in cart
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    // If quantity is 0, remove item from cart
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Check if enough stock is available
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Not enough stock available'
        });
      }
      
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    // Save cart
    await cart.save();
    
    // Populate product details and return cart
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name images price stock');
    
    res.status(200).json({
      success: true,
      data: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    
    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    // Find item in cart
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    // If item not found in cart
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    // Remove item from cart
    cart.items.splice(itemIndex, 1);
    
    // Save cart
    await cart.save();
    
    // Populate product details and return cart
    const updatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name images price stock');
    
    res.status(200).json({
      success: true,
      data: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    // Find and update user's cart
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0, totalItems: 0 },
      { new: true }
    );
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};