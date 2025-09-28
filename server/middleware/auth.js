const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - authenticate user
exports.protect = async (req, res, next) => {
  let token;
  
  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Admin only middleware
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as an admin'
    });
  }
};
