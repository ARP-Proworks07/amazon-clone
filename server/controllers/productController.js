const Product = require('../models/Product');

// @desc    Get all products with pagination and filtering
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      sort = 'createdAt',
      order = 'desc',
      search,
      featured
    } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    
    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Rating filter
    if (rating) filter.ratings = { $gte: Number(rating) };
    
    // Featured products
    if (featured === 'true') filter.isFeatured = true;
    
    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Pagination
    const pageNum = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNum - 1) * pageSize;
    
    // Sort
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;
    
    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pagination: {
        totalPages: Math.ceil(total / pageSize),
        currentPage: pageNum,
        pageSize
      },
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};