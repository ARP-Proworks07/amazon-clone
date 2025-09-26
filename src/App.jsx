import React from "react";
import "./App.css";

// Common Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="relative">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl text-center p-8">
          <h1 className="text-4xl font-bold mb-6">Welcome to Amazon Clone</h1>
          <p className="text-xl text-gray-600">This is a demo Amazon clone with a customized navbar and menu bar.</p>
        </div>
      </div>
    </main>
  );
}

export default App;
