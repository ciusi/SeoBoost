import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ComingSoon = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Coming Soon!</h1>
        <p>
           Per informazioni: 
           capstoneciuffetelli@gmail.com
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
