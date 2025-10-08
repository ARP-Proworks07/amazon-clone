import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication APIs
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const getCurrentUser = () => API.get('/auth/me');

// Product APIs
export const getProducts = (params = {}) => API.get('/products', { params });
export const getProductsByCategory = (category, page = 1, limit = 10) => 
  API.get('/products', { params: { category, page, limit } });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Cart APIs
export const getCart = () => API.get('/cart');
export const addToCart = (productId, quantity) => API.post('/cart', { productId, quantity });
export const updateCartItem = (productId, quantity) => API.put('/cart', { productId, quantity });
export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);
export const clearCart = () => API.delete('/cart');

export default API;
