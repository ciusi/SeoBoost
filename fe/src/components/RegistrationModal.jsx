import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    isLogin: false,
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
    if (!formData.isLogin && passwordStrength.score < 3) {
      setError('La password è troppo debole. Usa una combinazione di lettere, numeri e simboli.');
      return;
    }

    if (!formData.privacyChecked) {
      setError('Devi accettare la politica sulla privacy.');
      return;
    }

    try {
      const endpoint = formData.isLogin ? '/api/users/login' : '/api/users/register';
      const response = await axios.post(endpoint, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Registrazione avvenuta con successo! Controlla la tua email per la conferma.');
      onClose();
      navigate('/audit');
    } catch (err) {
      setError(err.response?.data?.msg || 'Errore durante la registrazione');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/google';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <div className="text-center mb-4">
          <img src="/logoseoboost.png" alt="SeoBoost Logo" className="mx-auto h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Vuoi scoprire come migliorare le performance del tuo sito web in pochi istanti?</h2>
        <p className="text-gray-600 mb-4">Iscriviti e inizia subito ad usare SeoBoost gratuitamente!</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!formData.isLogin && (
            <div className="form-group">
              <label className="block mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="form-group flex items-center">
            <input
              type="checkbox"
              name="privacyChecked"
              checked={formData.privacyChecked}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <label className="ml-2 text-gray-700">
              Accetto la <a href="/privacy" className="text-blue-500 hover:underline">politica sulla privacy</a> e i <a href="/cookie" className="text-blue-500 hover:underline">cookie</a>
            </label>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded transition ease-in-out duration-300 hover:bg-blue-600">
              {formData.isLogin ? 'Accedi' : 'Registrati'}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isLogin: !formData.isLogin })}
              className="bg-gray-500 text-white px-4 py-2 rounded transition ease-in-out duration-300 hover:bg-gray-600"
            >
              {formData.isLogin ? 'Crea un nuovo account' : 'Hai già un account? Accedi'}
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="bg-red-500 text-white px-4 py-2 rounded transition ease-in-out duration-300 hover:bg-red-600"
            >
              {formData.isLogin ? 'Accedi con Google' : 'Registrati con Google'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
