import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-lg mb-8">
          We're working hard to bring you something great! <br />
          Contact us for more information:
          <a href="mailto:info@silviaciuffetelli.it" className="text-blue-500 ml-2">
            info@silviaciuffetelli.it
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
