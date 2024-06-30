import React from 'react';

const CumulativeLayoutShift = ({ score }) => {
  let message = '';
  let messageClass = '';

  if (score < 0.1) {
    message = "Perfetto! La tua pagina è stabile durante il caricamento, offrendo una buona esperienza utente.";
    messageClass = 'text-green-500';
  } else if (score < 0.25) {
    message = "Buona stabilità, ma potrebbe essere migliorata. Assicurati che gli elementi della pagina non si spostino durante il caricamento.";
    messageClass = 'text-yellow-500';
  } else {
    message = "Attenzione: la tua pagina cambia troppo durante il caricamento, il che può confondere gli utenti. Cerca di fissare le dimensioni degli elementi per evitare spostamenti inaspettati.";
    messageClass = 'text-red-500';
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">Cumulative Layout Shift (CLS)</h2>
      <p>Il Cumulative Layout Shift (CLS) misura la stabilità visiva della tua pagina durante il caricamento. Un basso valore di CLS indica che gli elementi della pagina non si spostano inaspettatamente.</p>
      <p className={`mt-2 ${messageClass}`}>{message}</p>
    </div>
  );
};

export default CumulativeLayoutShift;
