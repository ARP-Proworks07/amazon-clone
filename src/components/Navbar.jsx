import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const menuItems = [
    {
      name: "All",
      icon: "≡",
      subCategories: ["Today's Deals", "Customer Service", "Registry", "Gift Cards"]
    },
    {
      name: "Fresh",
      subCategories: ["Vegetables", "Fruits", "Meat & Seafood", "Dairy & Eggs"]
    },
    {
      name: "Amazon miniTV",
      isNew: true
    },
    {
      name: "Sell",
      subCategories: ["Start Selling", "Learn to Sell", "Affiliate Program"]
    },
    {
      name: "Best Sellers",
      subCategories: ["in Electronics", "in Fashion", "in Books", "in Home"]
    },
    {
      name: "Mobiles",
      subCategories: ["Smartphones", "Basic Phones", "Accessories", "Cases"]
    },
    {
      name: "Today's Deals",
      isSpecial: true
    },
    {
      name: "Electronics",
      subCategories: ["Laptops", "TV & Audio", "Cameras", "Smart Home"]
    },
    {
      name: "Prime",
      icon: "★",
      subCategories: ["Free Delivery", "Prime Video", "Prime Music", "Prime Gaming"]
    }
  ];

  return (
    <div className="w-full">
      {/* Main Navbar - Dark Blue Box */}
      <div className="bg-[#0F3460] text-white">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 py-3">
          {/* Left - Amazon Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon Logo"
              className="h-8 cursor-pointer invert brightness-0 filter"
            />
            <span className="text-white ml-2 font-bold">.in</span>
          </Link>

          {/* Center - Search Bar */}
          <div className="flex flex-1 mx-4 max-w-2xl">
            <div className="flex w-full">
              <select className="px-2 py-2 bg-white text-black border-r border-gray-300 rounded-l-md text-sm">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Books</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon.in"
                className="w-full p-2 text-black outline-none border-none"
              />
              <button className="bg-[#E94560] px-6 rounded-r-md hover:bg-opacity-90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right - Login and Signup buttons */}
          <div className="flex items-center gap-4">
            <button className="bg-[#E94560] hover:bg-opacity-90 transition-colors py-2 px-4 rounded-md text-white font-medium">
              Login
            </button>
            <button className="border border-white hover:bg-white hover:text-[#0F3460] transition-colors py-2 px-4 rounded-md text-white font-medium">
              Sign Up
            </button>
            <Link to="/cart" className="flex items-center ml-2">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[#E94560] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Bar - Darker Blue Box */}
      <div className="relative bg-[#16213E] text-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center gap-6 px-4 py-3 text-sm overflow-x-auto no-scrollbar">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative flex-shrink-0"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  to="#"
                  className="flex items-center gap-1 cursor-pointer hover:text-[#E94560] transition-colors whitespace-nowrap font-medium"
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  {item.name}
                  {item.isNew && (
                    <span className="ml-1 text-xs bg-[#E94560] text-white px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  {item.subCategories && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.subCategories && hoveredCategory === index && (
                  <div className="absolute z-50 left-0 top-full mt-1 bg-white text-gray-800 shadow-lg rounded-md py-2 min-w-[200px] animate-fadeIn">
                    {item.subCategories.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 hover:text-[#E94560] transition-colors"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
