import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // In a real app, fetch from your API
    // For demo purposes, we'll use mock data
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Mock data - replace with actual API call when ready
        // const response = await getProduct(productId);
        // setProduct(response.data.data);
        
        // Mock data for demo
        setTimeout(() => {
          // Simulate fetching product based on productId
          const mockProducts = {
            '101': {
              id: '101',
              name: "Premium Wireless Earbuds",
              price: 1299,
              originalPrice: 2999,
              description: "Experience crystal-clear sound with our premium wireless earbuds. Features include active noise cancellation, 30-hour battery life, touch controls, and sweat resistance. Perfect for workouts, commuting, or everyday use.",
              images: [
                "https://m.media-amazon.com/images/I/61QRgOgBx0L._AC_UL320_.jpg",
                "https://m.media-amazon.com/images/I/71fwbMm1NBL._AC_UL320_.jpg"
              ],
              brand: "SoundTech",
              category: "Electronics",
              ratings: 4.5,
              numReviews: 1245,
              stock: 15,
              specifications: {
                "Battery Life": "30 hours",
                "Wireless": "Yes",
                "Water Resistant": "Yes",
                "Microphone": "Built-in",
                "Charging": "USB-C"
              }
            },
            '102': {
              id: '102',
              name: "Smart Watch Series 5",
              price: 2499,
              originalPrice: 4999,
              description: "Stay connected and track your fitness with our premium Smart Watch Series 5. Features include heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50 meters. Compatible with both Android and iOS devices.",
              images: [
                "https://m.media-amazon.com/images/I/71fwbMm1NBL._AC_UL320_.jpg",
                "https://m.media-amazon.com/images/I/81sBxsrBeyL._AC_UL320_.jpg"
              ],
              brand: "TechFit",
              category: "Electronics",
              ratings: 4.3,
              numReviews: 856,
              stock: 8,
              specifications: {
                "Display": "1.4 inch AMOLED",
                "Battery Life": "7 days",
                "Water Resistant": "50m",
                "GPS": "Built-in",
                "Compatibility": "iOS & Android"
              }
            },
            '103': {
              id: '103',
              name: "Bluetooth Speaker",
              price: 1999,
              originalPrice: 3499,
              description: "Fill your space with immersive sound from our portable Bluetooth speaker. With 24 hours of battery life, waterproof design, and 360° sound coverage, it's perfect for home, outdoor parties, or beach days. Features include built-in microphone for calls and voice assistant compatibility.",
              images: [
                "https://m.media-amazon.com/images/I/61y2VVWcGBL._AC_UL320_.jpg",
                "https://m.media-amazon.com/images/I/71EHw68EScL._AC_UL320_.jpg"
              ],
              brand: "SoundBass",
              category: "Electronics",
              ratings: 4.7,
              numReviews: 932,
              stock: 22,
              specifications: {
                "Battery Life": "24 hours",
                "Waterproof": "IPX7",
                "Bluetooth": "5.0",
                "Power": "20W",
                "Charging": "USB-C"
              }
            },
            '104': {
              id: '104',
              name: "Laptop Backpack with USB Charging Port",
              price: 1499,
              originalPrice: 2499,
              description: "Travel smartly with our ergonomic laptop backpack featuring a built-in USB charging port. With multiple compartments, water-resistant fabric, and anti-theft design, it's perfect for commuters and travelers. Fits laptops up to 15.6 inches and includes dedicated tablet pocket.",
              images: [
                "https://m.media-amazon.com/images/I/71cXBgoa3IL._AC_UL320_.jpg",
                "https://m.media-amazon.com/images/I/81c+5S5oHzL._AC_UL320_.jpg"
              ],
              brand: "TravelTech",
              category: "Accessories",
              ratings: 4.4,
              numReviews: 1876,
              stock: 35,
              specifications: {
                "Material": "Water-resistant polyester",
                "Laptop Compartment": "15.6 inches",
                "USB Port": "External with built-in cable",
                "Anti-theft": "Hidden rear pockets",
                "Capacity": "25L"
              }
            },
            '105': {
              id: '105',
              name: "Fitness Tracker with Heart Rate Monitor",
              price: 1799,
              originalPrice: 2999,
              description: "Track your fitness goals with precision using our advanced fitness tracker. Monitor heart rate, steps, calories, sleep quality and more. With 10 sport modes, smart notifications, and waterproof design, it's your perfect workout companion. The app provides detailed analysis and personalized insights.",
              images: [
                "https://m.media-amazon.com/images/I/61JM+MhfRiL._AC_UL320_.jpg",
                "https://m.media-amazon.com/images/I/71RdA6hTjqL._AC_UL320_.jpg"
              ],
              brand: "FitLife",
              category: "Electronics",
              ratings: 4.2,
              numReviews: 732,
              stock: 19,
              specifications: {
                "Display": "0.96 inch OLED",
                "Battery Life": "7 days",
                "Water Resistant": "IP68",
                "Compatibility": "iOS & Android",
                "Sensors": "Heart rate, Accelerometer, Gyroscope"
              }
            }
          };
          
          const selectedProduct = mockProducts[productId] || {
            id: productId,
            name: `Product ${productId}`,
            price: 999,
            originalPrice: 1999,
            description: "This is a placeholder description for a product that doesn't exist in our mock database.",
            images: [
              "https://via.placeholder.com/300?text=Product+Not+Found",
            ],
            brand: "Unknown",
            category: "Other",
            ratings: 3.0,
            numReviews: 0,
            stock: 0,
            specifications: {
              "Status": "Not available"
            }
          };
          
          setProduct(selectedProduct);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(Math.max(1, Math.min(value, product?.stock || 10)));
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      
      // In a real app, make an API call to add to cart
      // await addToCart(productId, quantity);
      
      // For demo, simulate API call
      setTimeout(() => {
        // Get existing cart from localStorage or initialize empty array
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if product already in cart
        const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          existingCart[existingItemIndex].quantity += quantity;
        } else {
          // Add new item if not exists
          existingCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
          });
        }
        
        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart));
        
        // Dispatch custom event to update cart count in navbar
        window.dispatchEvent(new Event('cartUpdated'));
        
        setMessage({
          type: 'success',
          text: `Added ${quantity} item${quantity > 1 ? 's' : ''} to your cart!`
        });
        
        setAddingToCart(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }, 800);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage({
        type: 'error',
        text: 'Failed to add to cart. Please try again.'
      });
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-gray-300 h-[400px]"></div>
            <div className="md:w-1/2">
              <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
            <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="mt-6 inline-block bg-[#febd69] hover:bg-[#f3a847] text-black px-6 py-2 rounded-md font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#f3a847]">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="hover:text-[#f3a847]">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Message display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left - Product Images */}
          <div className="md:w-1/2">
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-auto object-contain"
                style={{ maxHeight: '400px' }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="border rounded cursor-pointer">
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-20 object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right - Product Information */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < Math.floor(product.ratings) ? "★" : i < product.ratings ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.numReviews} reviews)</span>
            </div>
            
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="ml-3 text-green-600 font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Availability */}
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Availability: 
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? ` In Stock (${product.stock} available)` : ' Out of Stock'}
                </span>
              </p>
            </div>
            
            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
                <dl className="mt-2 border-t border-gray-200 divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">{key}</dt>
                      <dd className="text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="mt-8">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="shadow-sm focus:ring-[#f3a847] focus:border-[#f3a847] border-gray-300 rounded-md w-20 text-center"
                  />
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    disabled={addingToCart}
                    onClick={handleAddToCart}
                    className={`flex-1 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#f3a847] hover:bg-[#e29935] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f3a847] ${
                      addingToCart ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                  
                  <Link
                    to="/cart"
                    className="flex-1 px-6 py-3 border border-transparent text-base font-medium rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;