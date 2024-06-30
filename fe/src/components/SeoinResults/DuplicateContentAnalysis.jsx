import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DuplicateContentAnalysis = ({ url }) => {
  const [duplicateContentData, setDuplicateContentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDuplicateContentData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeDuplicateContent?url=${encodeURIComponent(url)}`);
        setDuplicateContentData(response.data);
      } catch (error) {
        setError('Errore nel caricamento del contenuto duplicato');
        console.error('Errore nel caricamento del contenuto duplicato:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchDuplicateContentData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!duplicateContentData) {
    return <p>Nessun dato disponibile per il contenuto duplicato.</p>;
  }

  // Analisi del contenuto duplicato per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (duplicateContentData.count > 0) {
    message = "Sono stati trovati contenuti duplicati, verifica e rimuovi il contenuto duplicato per migliorare l'indicizzazione.";
    bgColor = 'bg-red-500';
  } else {
    message = "Nessun contenuto duplicato rilevato.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Duplicate Content Analysis</h2>
      <p><strong>Numero di contenuti duplicati:</strong> {duplicateContentData.count}</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default DuplicateContentAnalysis;
