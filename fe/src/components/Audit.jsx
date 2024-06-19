import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';  // Assicurati di avere un componente Navbar

const Audit = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Devi essere registrato per effettuare un audit.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/audits', { url }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setResults(response.data.lighthouseResult);
      setError(null);
    } catch (err) {
      setError('Error fetching audit results');
    }
  };

  const renderResults = () => {
    if (!results) return null;

    const { categories, audits } = results;

    const coreWebVitals = [
      { id: 'first-contentful-paint', title: 'First Contentful Paint' },
      { id: 'speed-index', title: 'Speed Index' },
      { id: 'largest-contentful-paint', title: 'Largest Contentful Paint' },
      { id: 'interactive', title: 'Time to Interactive' },
      { id: 'total-blocking-time', title: 'Total Blocking Time' },
      { id: 'cumulative-layout-shift', title: 'Cumulative Layout Shift' }
    ];

    const renderMetric = (metric) => {
      return (
        <div key={metric.id} className="metric">
          <strong>{metric.title}:</strong> {audits[metric.id].displayValue}
        </div>
      );
    };

    return (
      <div className="results">
        <h2>Results for {results.finalUrl}</h2>
        <h3>Performance Score: {categories.performance.score * 100}</h3>
        <h3>Core Web Vitals</h3>
        {coreWebVitals.map(renderMetric)}
      </div>
    );
  };

  return (
    <div className="audit-page">
      <Navbar />
      <div className="container">
        <h1>PageSpeed Audit</h1>
        <form onSubmit={handleSubmit} className="audit-form">
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
        {renderResults()}
      </div>
    </div>
  );
};

export default Audit;
