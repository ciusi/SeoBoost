import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <img src="/logoseoboost.png" alt="Logo" className="logo" />
          <div className="navbar-links">
            <Link to="/guida">Guida all'Uso</Link>
            <Link to="/cookie">Cookie</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/audit">Analizza il tuo sito web</Link>
          </div>
          <div className="navbar-download">
            <Link to="/coming-soon" className="download-btn">Download</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
