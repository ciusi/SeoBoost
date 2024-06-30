import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/audit');
    } catch (err) {
      setError(err.response?.data?.msg || 'Errore durante il login');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/google';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <img src="/logoseoboost.png" alt="SeoBoost Logo" className="mx-auto mb-4 h-12" />
        <h2 className="text-2xl font-bold mb-4">Benvenuto su SeoBoost</h2>
        <p className="mb-4">Accedi per eseguire SEO audit gratuite e migliorare le performance del tuo sito web.</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4 text-left">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4">
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white py-2 px-4 rounded w-full mb-4"
          >
            Login with Google
          </button>
          <div className="mt-4">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Password dimenticata?
            </Link>
          </div>
          <div className="mt-4">
            <Link to="/register" className="text-blue-500 hover:underline">
              Non hai un account? Registrati
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
