import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagesOptimizationAnalysis = ({ url }) => {
  const [imagesData, setImagesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/analyzeImages?url=${encodeURIComponent(url)}`);
        setImagesData(response.data);
      } catch (error) {
        setError('Errore nel caricamento dell\'ottimizzazione delle immagini');
        console.error('Errore nel caricamento dell\'ottimizzazione delle immagini:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchImagesData();
    }
  }, [url]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  if (!imagesData) {
    return <p>Nessun dato disponibile per l'ottimizzazione delle immagini.</p>;
  }

  // Analisi dell'ottimizzazione delle immagini per fornire feedback
  let message = '';
  let bgColor = '';

  // Esempi di condizioni per il feedback, personalizzabili in base alle metriche SEO desiderate
  if (imagesData.totalSize > 1024) {
    message = "La dimensione totale delle immagini è troppo grande, riduci le dimensioni delle immagini per migliorare i tempi di caricamento.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Ottimizzazione delle immagini conforme alle migliori pratiche per SEO.";
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Images Optimization Analysis</h2>
      <p><strong>Dimensione totale delle immagini:</strong> {imagesData.totalSize} KB</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default ImagesOptimizationAnalysis;
