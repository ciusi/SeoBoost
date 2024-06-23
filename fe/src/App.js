import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Guida from './components/Guida';
import Cookie from './components/Cookie';
import Privacy from './components/Privacy';
import Audit from './components/Audit'; // Assicurati che il percorso sia corretto
import './index.css'; // CSS

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guida" element={<Guida />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
