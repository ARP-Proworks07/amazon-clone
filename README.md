# Amazon Clone

A full-featured Amazon clone built with React, Node.js, Express, and MongoDB.

## Features

- 🛒 Product browsing and searching
- 👤 User authentication (signup/login)
- 🛍️ Shopping cart functionality
- 📦 Product details with images and descriptions
- 💳 Checkout process

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Vite for fast development and building

### Backend
- Node.js with Express
- MongoDB with Mongoose for database
- JWT for authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
```

2. Install dependencies for frontend
```bash
npm install
```

3. Install dependencies for backend
```bash
cd server
npm install
cd ..
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

5. Run the development server (both frontend and backend)
```bash
npm run start
```

## Project Structure

```
amazon-clone/
├── public/             # Static files
├── server/             # Backend code
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # MongoDB models
│   └── routes/         # API routes
└── src/                # Frontend code
    ├── assets/         # Images and static assets
    ├── components/     # React components
    └── services/       # API service calls
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
