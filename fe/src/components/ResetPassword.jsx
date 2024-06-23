import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reset-password/reset', { token, password });
      setMessage(res.data.msg);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Errore durante la reimpostazione della password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Reimposta la tua password</h2>
        {message && <p>{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Nuova Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded shadow-sm"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Reimposta Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
