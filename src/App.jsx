import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="relative">
              <Navbar />
              <HomePage />
            </main>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
