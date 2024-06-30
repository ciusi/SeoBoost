import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MetaTagsAnalysis = ({ url }) => {
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetaData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeMetaTags?url=${encodeURIComponent(url)}`);
        setMetaData(response.data);
      } catch (error) {
        setError('Errore nel caricamento dei meta tag');
        console.error('Errore nel caricamento dei meta tag:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchMetaData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!metaData) {
    return <p>Nessun dato disponibile per i meta tag.</p>;
  }

  const { title, description, keywords } = metaData;

  // Analisi dei meta tag per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (title.length > 60) {
    message = "Il titolo è troppo lungo, considera di ridurlo per una migliore visualizzazione nei risultati di ricerca.";
    bgColor = 'bg-yellow-500';
  } else if (description.length < 120) {
    message = "La descrizione è troppo corta, aggiungi informazioni per attrarre meglio gli utenti nei risultati di ricerca.";
    bgColor = 'bg-yellow-500';
  } else if (keywords.length === 0) {
    message = "Non sono presenti parole chiave, aggiungi parole chiave pertinenti per migliorare l'indicizzazione.";
    bgColor = 'bg-red-500';
  } else {
    message = "Meta tag ottimizzati per SEO.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Meta Tags Analysis</h2>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Keywords:</strong> {keywords.join(', ')}</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default MetaTagsAnalysis;
