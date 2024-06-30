import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-complementary shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src="/logoseoboost.png" alt="Logo" className="h-10 w-auto mr-4" />
          <div className="hidden lg:flex space-x-4">
            <Link to="/guida" className="text-main hover:text-main-dark">Guida all'Uso</Link>
            <Link to="/cookie" className="text-main hover:text-main-dark">Cookie</Link>
            <Link to="/privacy" className="text-main hover:text-main-dark">Privacy</Link>
            <Link to="/audit" className="text-main hover:text-main-dark">Analizza il tuo sito web</Link>
          </div>
        </div>
        <div className="hidden lg:block">
          <Link to="/coming-soon" className="download-btn text-white bg-main hover:bg-main-dark px-4 py-2 rounded">Download</Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-main hover:text-main-dark focus:outline-none focus:text-main-dark">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/guida" className="block text-main hover:text-main-dark">Guida all'Uso</Link>
          <Link to="/cookie" className="block text-main hover:text-main-dark">Cookie</Link>
          <Link to="/privacy" className="block text-main hover:text-main-dark">Privacy</Link>
          <Link to="/audit" className="block text-main hover:text-main-dark">Analizza il tuo sito web</Link>
          <Link to="/coming-soon" className="download-btn block text-center text-white bg-main hover:bg-main-dark px-4 py-2 rounded">Download</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
