import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URLStructureAnalysis = ({ url }) => {
  const [urlStructureData, setUrlStructureData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrlStructureData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeURLStructure?url=${encodeURIComponent(url)}`);
        setUrlStructureData(response.data);
      } catch (error) {
        setError('Errore nel caricamento della struttura degli URL');
        console.error('Errore nel caricamento della struttura degli URL:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchUrlStructureData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!urlStructureData) {
    return <p>Nessun dato disponibile per la struttura degli URL.</p>;
  }

  // Analisi della struttura degli URL per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (!urlStructureData.includes('keyword')) {
    message = "La struttura degli URL non include parole chiave, considera di ottimizzare gli URL con parole chiave rilevanti.";
    bgColor = 'bg-red-500';
  } else {
    message = "Struttura degli URL ottimizzata per SEO.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">URL Structure Analysis</h2>
      <p><strong>Struttura degli URL:</strong> {urlStructureData}</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default URLStructureAnalysis;
