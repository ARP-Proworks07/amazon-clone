import React from "react";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <main className="relative">
      <Navbar />
      <HomePage />
    </main>
  );
}

export default App;
