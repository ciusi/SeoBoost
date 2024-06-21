import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assicurati di avere il file CSS

function Navbar() {
  return (
    <nav>
      <div className="navbar-top">
        <img src="/logo.svg" alt="Logo" className="logo" />
      </div>
      <div className="navbar-bottom">
        <div className="navbar-links">
          <Link to="/guida">Guida all'Uso</Link>
          <Link to="/cookie">Cookie</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/">Analizza il tuo sito web</Link>
        </div>
        <div className="navbar-download">
          <Link to="/coming-soon" className="download-btn">Download</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
