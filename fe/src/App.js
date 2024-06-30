import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Guida from './components/Guida';
import Cookie from './components/Cookie';
import Privacy from './components/Privacy';
import Audit from './components/Audit';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ComingSoon from './components/ComingSoon';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import './index.css';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/guida" element={<PrivateRoute element={<Guida />} />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/audit" element={<PrivateRoute element={<Audit />} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/confirmation/:token" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
