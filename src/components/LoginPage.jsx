import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // This is a mock login - in production, use the actual API call
      // const response = await loginUser(formData);
      // localStorage.setItem("token", response.data.token);
      
      // For demo purposes, we'll just simulate success
      console.log("Login attempt with:", formData);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className="h-16 mx-auto"
            />
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                placeholder="Enter your password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Passwords must be at least 6 characters.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#febd69] hover:bg-[#f3a847] transition-colors py-2 rounded-md text-black font-medium ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              New to Amazon?
            </p>
            <Link
              to="/signup"
              className="block w-full text-center border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors py-2 rounded-md text-sm"
            >
              Create your Amazon account
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            &copy; 1996-2025, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;