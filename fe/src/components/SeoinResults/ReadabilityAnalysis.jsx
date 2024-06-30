import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadabilityAnalysis = ({ url }) => {
  const [readabilityData, setReadabilityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadabilityData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeReadability?url=${encodeURIComponent(url)}`);
        setReadabilityData(response.data);
      } catch (error) {
        setError('Errore nel caricamento della leggibilità');
        console.error('Errore nel caricamento della leggibilità:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchReadabilityData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!readabilityData) {
    return <p>Nessun dato disponibile per la leggibilità.</p>;
  }

  // Analisi della leggibilità per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (readabilityData.fleschReadingEase < 60) {
    message = "Il livello di leggibilità è basso, semplifica il contenuto per migliorare l'esperienza dell'utente.";
    bgColor = 'bg-red-500';
  } else {
    message = "Il contenuto è facilmente leggibile.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Readability Analysis</h2>
      <p><strong>Indice di leggibilità Flesch:</strong> {readabilityData.fleschReadingEase}</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default ReadabilityAnalysis;
