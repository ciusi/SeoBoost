import React, { useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';

const Audit = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/audits', { url });
      setResults(response.data.results); // Assuming `results` contains the audit data
      setError(null);
    } catch (err) {
      setError('Error fetching audit results');
      console.error('Error during audit request:', err.message);
    }
  };

  return (
    <div>
      <h1>PageSpeed Audit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Run Audit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results && (
        <div>
          <h2>Results</h2>
          <ReactJson src={results} />
        </div>
      )}
    </div>
  );
};

export default Audit;
