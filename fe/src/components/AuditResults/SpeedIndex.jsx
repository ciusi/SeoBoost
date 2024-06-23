import React from 'react';

const SpeedIndex = ({ score }) => {
  let message = '';
  let bgColor = '';

  if (score < 3.4) {
    message = "Perfetto! Il contenuto della tua pagina viene visualizzato molto rapidamente, migliorando l'esperienza utente.";
    bgColor = 'bg-green-500';
  } else if (score < 5.8) {
    message = "La velocità di visualizzazione del contenuto è buona, ma può essere migliorata. Ottimizza le risorse per velocizzare ulteriormente.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "La velocità di visualizzazione del contenuto è troppo lenta. Ottimizza le risorse per migliorare la velocità di caricamento della pagina.";
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Speed Index (SI)</h2>
      <p>Il Speed Index (SI) misura la velocità con cui il contenuto della pagina è visivamente completo. Un basso valore di Speed Index indica che il contenuto della pagina viene visualizzato rapidamente.</p>
      <p className="mt-2"><strong>Risultato:</strong> {score} secondi</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default SpeedIndex;
