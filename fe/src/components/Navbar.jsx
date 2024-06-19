import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'fe\public\logo.svg'; // Assicurati di avere il logo in questa posizione

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <Link to="/">Analizza il tuo sito web</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/cookie">Cookie</Link>
      <Link to="/guida">Guida all'uso</Link>
    </nav>
  );
}

export default Navbar;
