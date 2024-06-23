import React from 'react';

const TotalBlockingTime = ({ score }) => {
  let message = '';
  let bgColor = '';

  if (score < 300) {
    message = "Eccellente! La tua pagina rimane interattiva durante il caricamento, migliorando l'esperienza utente.";
    bgColor = 'bg-green-500';
  } else if (score < 600) {
    message = "Il tempo di blocco totale è accettabile, ma potrebbe essere migliorato. Riduci i task lunghi per migliorare la reattività.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Il tempo di blocco totale è troppo lungo, riducendo la reattività della pagina. Ottimizza il codice per migliorare la reattività.";
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Total Blocking Time (TBT)</h2>
      <p>Il Total Blocking Time (TBT) misura il tempo durante il quale la pagina è stata bloccata da compiti lunghi, impedendo l'interattività. Un basso TBT indica una migliore reattività della pagina.</p>
      <p className="mt-2"><strong>Risultato:</strong> {score} ms</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default TotalBlockingTime;
