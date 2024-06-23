import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Guida = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Guida all'Uso</h1>
        <section>
          <h2>Titolo 1</h2>
          <p>Paragrafo 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>
        <section>
          <h2>Titolo 2</h2>
          <p>Paragrafo 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>
        <section>
          <h2>Titolo 3</h2>
          <p>Paragrafo 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Guida;
