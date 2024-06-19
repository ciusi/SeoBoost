import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!privacyChecked) {
      setError('Devi accettare la politica sulla privacy.');
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token);
      } else {
        const response = await axios.post('/api/users/register', { name, email, password });
        localStorage.setItem('token', response.data.token);
      }
      onClose();
      navigate('/audit');
    } catch (err) {
      setError(err.response?.data?.msg || 'Errore durante la registrazione');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg relative z-10 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Benvenuto su PageSpeed Audit</h2>
        <p className="mb-4">Registrati o accedi per utilizzare il nostro strumento di audit della velocità delle pagine.</p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className="mr-2 leading-tight"
              />
              Accetto la politica sulla privacy
            </label>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            {isLogin ? 'Accedi' : 'Registrati'}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-4 text-blue-500"
          >
            {isLogin ? 'Crea un nuovo account' : 'Hai già un account? Accedi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
