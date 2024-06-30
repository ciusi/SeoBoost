import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeadingsAnalysis = ({ url }) => {
  const [headingsData, setHeadingsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadingsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeHeadings?url=${encodeURIComponent(url)}`);
        setHeadingsData(response.data);
      } catch (error) {
        setError('Errore nel caricamento degli heading');
        console.error('Errore nel caricamento degli heading:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchHeadingsData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!headingsData) {
    return <p>Nessun dato disponibile per gli heading.</p>;
  }

  // Analisi degli headings per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (headingsData.h1.length === 0) {
    message = "Non è presente nessun tag H1, aggiungi almeno un H1 per migliorare la struttura del contenuto.";
    bgColor = 'bg-red-500';
  } else if (headingsData.h1.length > 1) {
    message = "Ci sono troppi tag H1, considera di utilizzare un solo H1 per pagina.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Struttura degli heading ottimizzata per SEO.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Headings Analysis</h2>
      <p><strong>Numero di tag H1:</strong> {headingsData.h1.length}</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default HeadingsAnalysis;
