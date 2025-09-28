# Amazon Clone Server

This is the backend API for the Amazon Clone project. It provides endpoints for user authentication, product management, and shopping cart functionality.

## Technologies Used

- **Node.js & Express**: Backend API framework
- **MongoDB & Mongoose**: Database and ODM for data modeling
- **JWT**: Authentication mechanism
- **bcryptjs**: Password hashing

## Project Structure

```
server/
├── controllers/     # Route controller functions
│   ├── authController.js      # Authentication logic (register, login)
│   ├── productController.js   # Product CRUD operations
│   └── cartController.js      # Shopping cart operations
├── middleware/      # Custom middleware
│   └── auth.js      # Authentication and authorization middleware
├── models/          # Mongoose data models
│   ├── User.js      # User data schema
│   ├── Product.js   # Product data schema
│   └── Cart.js      # Shopping cart data schema
├── routes/          # API route definitions
│   ├── auth.js      # Authentication routes
│   ├── products.js  # Product routes
│   └── cart.js      # Shopping cart routes
├── .env             # Environment variables
├── index.js         # Entry point for the application
├── package.json     # Project dependencies
└── README.md        # Documentation
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/me`: Get current user info (protected)

### Products

- `GET /api/products`: Get all products (with filtering)
- `GET /api/products/:id`: Get a single product
- `POST /api/products`: Create a product (admin only)
- `PUT /api/products/:id`: Update a product (admin only)
- `DELETE /api/products/:id`: Delete a product (admin only)

### Cart

- `GET /api/cart`: Get user's cart (protected)
- `POST /api/cart`: Add item to cart (protected)
- `PUT /api/cart`: Update cart item quantity (protected)
- `DELETE /api/cart/:productId`: Remove item from cart (protected)
- `DELETE /api/cart`: Clear cart (protected)

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/amazon-clone
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=30d
   NODE_ENV=development
   ```

3. Run the server:
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Development

The server includes nodemon for hot reloading during development. Run with:

```
npm run dev
```

This will restart the server automatically when changes are detected.
