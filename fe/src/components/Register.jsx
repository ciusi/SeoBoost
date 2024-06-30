import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    privacyChecked: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const passwordStrength = zxcvbn(formData.password);
    if (passwordStrength.score < 3) {
      setError('La password è troppo debole. Usa una combinazione di lettere, numeri e simboli.');
      return;
    }

    if (!formData.privacyChecked) {
      setError('Devi accettare la politica sulla privacy.');
      return;
    }

    try {
      const response = await axios.post('/api/users/register', formData);
      localStorage.setItem('token', response.data.token);
      alert('Registrazione avvenuta con successo! Controlla la tua email per la conferma.');
      navigate('/audit');
    } catch (err) {
      setError(err.response?.data?.msg || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <img src="/logoseoboost.png" alt="SeoBoost Logo" className="mx-auto mb-4 h-12" />
        <h2 className="text-2xl font-bold mb-4">Benvenuto su SeoBoost</h2>
        <p className="mb-4">Registrati per eseguire SEO audit gratuite e migliorare le performance del tuo sito web.</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4 text-left">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
              required
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
              required
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex items-center text-left">
            <input
              type="checkbox"
              name="privacyChecked"
              checked={formData.privacyChecked}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <label className="ml-2 text-gray-700">
              Accetto la <Link to="/privacy" className="text-blue-500 hover:underline">politica sulla privacy</Link> e i <Link to="/cookie" className="text-blue-500 hover:underline">cookie</Link>
            </label>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4">
            Registrati
          </button>
          <div className="mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Hai già un account? Accedi
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
