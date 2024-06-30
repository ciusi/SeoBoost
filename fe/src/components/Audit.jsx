import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import LargestContentfulPaint from './AuditResults/LargestContentfulPaint';
import FirstContentfulPaint from './AuditResults/FirstContentfulPaint';
import CumulativeLayoutShift from './AuditResults/CumulativeLayoutShift';
import FirstInputDelay from './AuditResults/FirstInputDelay';
import TimeToInteractive from './AuditResults/TimeToInteractive';
import TotalBlockingTime from './AuditResults/TotalBlockingTime';
import SpeedIndex from './AuditResults/SpeedIndex';
import SeoInResults from './/SeoinResults/SeoInResults';


const Audit = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Submitting URL:', url);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/audits',
        { url },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true // Permette l'invio di cookie con la richiesta
        }
      );
      console.log('API Response:', response.data);
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching audit results:', err);
      setError(`Error fetching audit results: ${err.response ? err.response.data : err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderPageSpeedResults = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!results || !results.results || !results.results.lighthouseResult || !results.results.lighthouseResult.audits) {
      return <p>No results found.</p>;
    }

    const { audits } = results.results.lighthouseResult;

    const getAuditValue = (id) => {
      const audit = audits[id];
      console.log(`Audit value for ${id}:`, audit ? audit.numericValue : 'Not found');
      return audit ? audit.numericValue : null;
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getAuditValue('largest-contentful-paint') !== null && (
          <div className="card">
            <LargestContentfulPaint score={getAuditValue('largest-contentful-paint') / 1000} />
          </div>
        )}
        {getAuditValue('first-contentful-paint') !== null && (
          <div className="card">
            <FirstContentfulPaint score={getAuditValue('first-contentful-paint') / 1000} />
          </div>
        )}
        {getAuditValue('cumulative-layout-shift') !== null && (
          <div className="card">
            <CumulativeLayoutShift score={getAuditValue('cumulative-layout-shift')} />
          </div>
        )}
        {getAuditValue('first-input-delay') !== null && (
          <div className="card">
            <FirstInputDelay score={getAuditValue('first-input-delay')} />
          </div>
        )}
        {getAuditValue('interactive') !== null && (
          <div className="card">
            <TimeToInteractive score={getAuditValue('interactive') / 1000} />
          </div>
        )}
        {getAuditValue('total-blocking-time') !== null && (
          <div className="card">
            <TotalBlockingTime score={getAuditValue('total-blocking-time')} />
          </div>
        )}
        {getAuditValue('speed-index') !== null && (
          <div className="card">
            <SpeedIndex score={getAuditValue('speed-index') / 1000} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-3xl font-bold mb-4">Analizza il tuo sito web</h1>

        <div className="section">
          <h2 className="text-2xl font-semibold mb-4">1) Analizza i Core Vitals con PageSpeed Insights</h2>
          <form onSubmit={handleSubmit} className="audit-form mb-4">
            <div>
              <label htmlFor="url" className="block text-lg mb-2">URL</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <button type="submit" className="bg-main text-white px-4 py-2 rounded hover:bg-main-dark transition">Avvia Audit</button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {renderPageSpeedResults()}
        </div>

        <div className="section">
          <h2 className="text-2xl font-semibold mb-4">2) Analizza la SEO in-page</h2>
          {results && (
    <SeoInResults seoData={results.results.seoIn} />
  )}
        
        </div>

        <div className="section">
          <h2 className="text-2xl font-semibold mb-4">3) Analizza i touch point online del tuo sito web</h2>
          <p>Funzionalità in fase di sviluppo...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Audit;
