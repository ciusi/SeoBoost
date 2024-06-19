// components/Audit.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactJson from 'react-json-view';

const Audit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(location.state?.results || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!results) {
      setError('No results available');
    }
  }, [results]);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          {isLoggedIn ? (
            <ReactJson src={results} />
          ) : (
            <div>
              <p>Partial results shown. Please register to see full results.</p>
              <button
                onClick={handleRegister}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Audit;
