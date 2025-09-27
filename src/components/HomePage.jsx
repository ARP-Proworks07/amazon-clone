import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Sample data for different deal categories
  const dealCategories = [
    {
      id: 1,
      title: "Today's Deals",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Deals_1x._SY304_CB430401028_.jpg",
      discount: "Up to 70% off"
    },
    {
      id: 2,
      title: "Stationery & Office Supplies",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg",
      discount: "Starting at ₹199"
    },
    {
      id: 3,
      title: "Electronics",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg",
      discount: "Up to 40% off"
    },
    {
      id: 4,
      title: "Home & Kitchen",
      image: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg",
      discount: "Up to 30% off"
    }
  ];

  // Featured product data
  const featuredProducts = [
    {
      id: 101,
      name: "Wireless Earbuds",
      image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._AC_UL320_.jpg",
      price: "₹1,299",
      originalPrice: "₹2,999",
      rating: 4.5,
      reviewCount: 1245
    },
    {
      id: 102,
      name: "Smart Watch Series 5",
      image: "https://m.media-amazon.com/images/I/71fwbMm1NBL._AC_UL320_.jpg",
      price: "₹2,499",
      originalPrice: "₹4,999",
      rating: 4.3,
      reviewCount: 856
    },
    {
      id: 103,
      name: "Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/61y2VVWcGBL._AC_UL320_.jpg",
      price: "₹1,999",
      originalPrice: "₹3,499",
      rating: 4.7,
      reviewCount: 932
    },
    {
      id: 104,
      name: "Laptop Backpack",
      image: "https://m.media-amazon.com/images/I/71rSq80kdzL._AC_UL320_.jpg",
      price: "₹899",
      originalPrice: "₹1,499",
      rating: 4.4,
      reviewCount: 1432
    },
    {
      id: 105,
      name: "Smartphone Holder",
      image: "https://m.media-amazon.com/images/I/61b0vQBO5AL._AC_UL320_.jpg",
      price: "₹349",
      originalPrice: "₹699",
      rating: 4.1,
      reviewCount: 567
    }
  ];

  // Hero banners with carousel
  const heroBanners = [
    {
      id: 1,
      image: "https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg",
      alt: "Prime Day Deals"
    },
    {
      id: 2,
      image: "https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg",
      alt: "Electronics Sale"
    },
    {
      id: 3,
      image: "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg",
      alt: "Back to School"
    }
  ];

  return (
    <div className="bg-gray-100 pb-10">
      {/* Hero Banner Carousel */}
      <div className="relative">
        <div className="w-full overflow-hidden">
          <img 
            src={heroBanners[0].image} 
            alt={heroBanners[0].alt} 
            className="w-full object-cover h-[300px] md:h-[400px]"
          />
        </div>
        <div className="absolute left-0 bottom-0 w-full h-[50px] bg-gradient-to-t from-gray-100 to-transparent"></div>
      </div>

      {/* Deal Categories */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dealCategories.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-3">{category.title}</h2>
              <div className="relative overflow-hidden rounded-md">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white font-bold text-lg">{category.discount}</span>
                </div>
              </div>
              <Link to="#" className="text-[#007185] hover:text-[#C7511F] hover:underline block mt-3">
                See all deals
              </Link>
            </div>
          ))}
        </div>

        {/* Featured Products Section */}
        <div className="bg-white p-4 rounded-md shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              See all
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="border rounded-md p-3 hover:shadow-lg transition-shadow">
                <div className="h-[150px] flex items-center justify-center mb-2">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-2 h-10">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                <div className="mt-1">
                  <span className="font-bold text-lg">{product.price}</span>
                  <span className="text-gray-500 line-through text-xs ml-2">{product.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner for Prime */}
        <div className="bg-white p-4 rounded-md shadow-md mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <h2 className="text-3xl font-bold mb-4">Join Prime today</h2>
              <p className="text-lg mb-6">Fast, FREE delivery, exclusive deals, award-winning movies & TV shows with Prime</p>
              <button className="bg-[#febd69] hover:bg-[#f3a847] transition-colors py-2 px-6 rounded-md text-black font-medium">
                Try Prime Free for 30 days
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://m.media-amazon.com/images/G/31/prime/detail_page/Prime_Detail_Page_PC_Benefits_Delivery_1344x526._CB585627805_.jpg" 
                alt="Prime Benefits"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stationery Deals (Special Category Banner) */}
        <div className="bg-white p-4 rounded-md shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Deals on Stationery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="text-center">
                <div className="h-[100px] flex items-center justify-center bg-gray-50 rounded-md mb-2">
                  <img 
                    src={`https://m.media-amazon.com/images/I/71kSLhL3NDL._AC_UL320_.jpg`} 
                    alt="Stationery item"
                    className="max-h-[80px] max-w-[80%] object-contain"
                  />
                </div>
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">-42%</span>
                <p className="text-xs mt-1">Notebooks & Diaries</p>
              </div>
            ))}
          </div>
          <Link to="#" className="text-[#007185] hover:text-[#C7511F] hover:underline block mt-4">
            See all deals in Stationery
          </Link>
        </div>

        {/* Electronics Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 rounded-md shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-4 md:mb-0">
              <h2 className="text-3xl font-bold mb-3">Tech Deals of the Week</h2>
              <p className="text-lg mb-4">Save big on laptops, smartphones, accessories & more!</p>
              <button className="bg-white text-blue-900 hover:bg-gray-100 transition-colors py-2 px-6 rounded-md font-medium">
                Shop All Electronics
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://m.media-amazon.com/images/I/71RxCmvnrbL._AC_UL320_.jpg" 
                alt="Electronics Deal"
                className="max-w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-3">Your Recently Viewed Items</h2>
          <p className="text-gray-500 mb-4">Items you've recently browsed will appear here</p>
          <div className="border-t pt-3 text-center">
            <p className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
              Sign in to view your recently viewed items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;