import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 0 ? (subtotal > 1000 ? 0 : 99) : 0;
  const totalAmount = subtotal + shippingCost;
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    // Load cart data from localStorage or API
    const loadCart = () => {
      try {
        // In a real app, fetch from API
        // For demo, we'll use localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading cart:', error);
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    // In a real app, make an API call to update cart
    // For demo, we'll update localStorage directly
    
    setTimeout(() => {
      const updatedCart = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Dispatch custom event to update cart count in navbar
      window.dispatchEvent(new Event('cartUpdated'));
      setUpdating(false);
    }, 300);
  };

  const removeItem = (itemId) => {
    setUpdating(true);
    
    // In a real app, make an API call to remove from cart
    // For demo, we'll update localStorage directly
    
    setTimeout(() => {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Dispatch custom event to update cart count in navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      setMessage({
        type: 'success',
        text: 'Item removed from cart'
      });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      setUpdating(false);
    }, 300);
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setUpdating(true);
      
      // In a real app, make an API call to clear cart
      // For demo, we'll update localStorage directly
      
      setTimeout(() => {
        setCartItems([]);
        localStorage.removeItem('cart');
        
        // Dispatch custom event to update cart count in navbar
        window.dispatchEvent(new Event('cartUpdated'));
        
        setMessage({
          type: 'success',
          text: 'Cart cleared successfully'
        });
        
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        setUpdating(false);
      }, 300);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex border-b pb-6">
                  <div className="h-24 w-24 bg-gray-300 rounded"></div>
                  <div className="ml-6 flex-1">
                    <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/" className="inline-block bg-[#febd69] hover:bg-[#f3a847] text-black px-6 py-3 rounded-md font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items ({totalItems})</h2>
                  <button 
                    onClick={clearCart}
                    disabled={updating}
                    className="text-sm text-gray-600 hover:text-red-600"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row border-b pb-6">
                      <div className="sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-[#f3a847]">
                            {item.name}
                          </Link>
                          <p className="text-lg font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updating}
                              className={`px-3 py-1 text-gray-600 hover:bg-gray-100 ${
                                item.quantity <= 1 || updating ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={updating}
                              className={`px-3 py-1 text-gray-600 hover:bg-gray-100 ${
                                updating ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            disabled={updating}
                            className={`text-sm text-red-600 hover:text-red-800 ${
                              updating ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal ({totalItems} items)</p>
                    <p className="text-gray-900 font-medium">₹{subtotal.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-gray-900 font-medium">
                      {shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString()}`}
                    </p>
                  </div>
                  
                  {shippingCost > 0 && (
                    <p className="text-sm text-gray-500">
                      Add ₹{(1000 - subtotal).toLocaleString()} more to qualify for free shipping
                    </p>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <p className="text-lg font-medium text-gray-900">Total</p>
                      <p className="text-lg font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  className="mt-6 w-full bg-[#febd69] hover:bg-[#f3a847] text-black py-3 rounded-md font-medium"
                >
                  Proceed to Checkout
                </button>
                
                <Link to="/" className="mt-4 block w-full text-center py-2 text-[#007185] hover:text-[#C7511F] hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;