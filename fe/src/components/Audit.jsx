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
import Loader from './Loader';

const Audit = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Mostra il loader
    try {
      const response = await axios.post('http://localhost:5000/api/audits', { url }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError(`Error fetching audit results: ${err.response ? err.response.data : err.message}`);
    } finally {
      setLoading(false);  // Nascondi il loader
    }
  };

  const renderResults = () => {
    if (loading) {
      return <Loader />;  // Mostra il loader se i dati sono in caricamento
    }

    if (!results || !results.lighthouseResult || !results.lighthouseResult.audits) {
      return <p>No results found.</p>;
    }

    const { audits } = results.lighthouseResult;

    const getAuditValue = (id) => {
      const audit = audits[id];
      return audit ? audit.numericValue : null;
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getAuditValue('largest-contentful-paint') !== null && (
          <LargestContentfulPaint score={getAuditValue('largest-contentful-paint') / 1000} />
        )}
        {getAuditValue('first-contentful-paint') !== null && (
          <FirstContentfulPaint score={getAuditValue('first-contentful-paint') / 1000} />
        )}
        {getAuditValue('cumulative-layout-shift') !== null && (
          <CumulativeLayoutShift score={getAuditValue('cumulative-layout-shift')} />
        )}
        {getAuditValue('first-input-delay') !== null && (
          <FirstInputDelay score={getAuditValue('first-input-delay')} />
        )}
        {getAuditValue('interactive') !== null && (
          <TimeToInteractive score={getAuditValue('interactive') / 1000} />
        )}
        {getAuditValue('total-blocking-time') !== null && (
          <TotalBlockingTime score={getAuditValue('total-blocking-time')} />
        )}
        {getAuditValue('speed-index') !== null && (
          <SpeedIndex score={getAuditValue('speed-index') / 1000} />
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-3xl font-bold mb-4">Analizza il tuo sito web</h1>
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
        {renderResults()}
      </div>
      <Footer />
    </div>
  );
};

export default Audit;
