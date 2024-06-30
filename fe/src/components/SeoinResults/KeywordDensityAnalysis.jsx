import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KeywordDensityAnalysis = ({ url }) => {
  const [keywordDensityData, setKeywordDensityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeywordDensityData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeKeywordDensity?url=${encodeURIComponent(url)}`);
        setKeywordDensityData(response.data);
      } catch (error) {
        setError('Errore nel caricamento della densità delle parole chiave');
        console.error('Errore nel caricamento della densità delle parole chiave:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchKeywordDensityData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!keywordDensityData) {
    return <p>Nessun dato disponibile per la densità delle parole chiave.</p>;
  }

  // Analisi della densità delle parole chiave per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (keywordDensityData.density < 1) {
    message = "La densità delle parole chiave è troppo bassa, considera di includere più volte le parole chiave principali nel contenuto.";
    bgColor = 'bg-red-500';
  } else if (keywordDensityData.density > 2) {
    message = "La densità delle parole chiave è troppo alta, evita il keyword stuffing e assicurati che l'uso delle parole chiave sia naturale.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Densità delle parole chiave ottimizzata per SEO.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Keyword Density Analysis</h2>
      <p><strong>Densità delle parole chiave:</strong> {keywordDensityData.density}</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default KeywordDensityAnalysis;
