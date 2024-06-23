import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Cookie = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Cookie Policy</h1>
        <p>
          Qui puoi inserire la tua cookie policy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Cookie;
