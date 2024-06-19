// components/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/audits', { url }, {
        headers: {
          'Authorization': token
        }
      });
      setLoading(false);
      navigate('/audit', { state: { results: response.data.results } });
    } catch (err) {
      setLoading(false);
      console.error('Error during audit request:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">SEOBoost</div>
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-center mt-20">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Start PageSpeed Audit</h2>
          <div className="mb-4">
            <label className="block text-gray-700">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Running Audit...' : 'Start Audit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
