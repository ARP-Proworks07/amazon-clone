import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);

    try {
      // This is a mock registration - in production, use the actual API call
      // const userData = {
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password
      // };
      // const response = await registerUser(userData);
      // localStorage.setItem("token", response.data.token);
      
      // For demo purposes, we'll just simulate success
      console.log("Registration attempt with:", formData);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
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
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                placeholder="First and last name"
              />
            </div>
            
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
            
            <div className="mb-4">
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
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                placeholder="At least 6 characters"
              />
              <p className="text-xs text-gray-500 mt-1">
                Passwords must be at least 6 characters.
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                placeholder="Confirm your password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#febd69] hover:bg-[#f3a847] transition-colors py-2 rounded-md text-black font-medium ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create your Amazon account"}
            </button>
          </form>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#007185] hover:text-[#C7511F] hover:underline">
                Sign in
              </Link>
            </p>
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

export default SignupPage;