import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to SEOBoost</h1>
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 underline mr-4">Login</Link>
          <Link to="/register" className="text-blue-500 underline">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
