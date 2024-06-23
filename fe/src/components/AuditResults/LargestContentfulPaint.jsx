import React from 'react';

const LargestContentfulPaint = ({ score }) => {
  let message = '';
  let bgColor = '';

  if (score < 1.5) {
    message = "Ottimo lavoro! Il contenuto principale della tua pagina si carica molto velocemente. Continua così!";
    bgColor = 'bg-green-500';
  } else if (score < 2.5) {
    message = "Il tempo di caricamento è accettabile, ma potrebbe essere migliorato. Cerca di ottimizzare le immagini e il codice per velocizzare ulteriormente.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Attenzione: il contenuto principale della tua pagina impiega troppo tempo a caricarsi. Prova a ridurre la dimensione delle immagini o a ottimizzare il codice per migliorare i tempi di caricamento.";
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Largest Contentful Paint (LCP)</h2>
      <p>Il Largest Contentful Paint (LCP) misura il tempo necessario affinché il contenuto più grande della tua pagina diventi visibile. È un indicatore di quando la pagina sembra essere caricata.</p>
      <p className="mt-2"><strong>Risultato:</strong> {score} secondi</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default LargestContentfulPaint;
