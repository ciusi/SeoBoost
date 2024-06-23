import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Guida from './components/Guida';
import Cookie from './components/Cookie';
import Privacy from './components/Privacy';
import Audit from './components/Audit';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ComingSoon from './components/ComingSoon';
import Confirmation from './components/Confirmation';
import './index.css';

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
