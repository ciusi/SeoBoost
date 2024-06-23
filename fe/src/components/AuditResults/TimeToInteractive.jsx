import React from 'react';

const TimeToInteractive = ({ score }) => {
  let message = '';
  let bgColor = '';

  if (score < 3.8) {
    message = "Fantastico! La tua pagina è rapidamente interattiva, migliorando l'esperienza utente.";
    bgColor = 'bg-green-500';
  } else if (score < 5) {
    message = "Buon tempo di interattività, ma c'è spazio per migliorare. Ottimizza il caricamento delle risorse per accelerare ulteriormente.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Il tempo necessario affinché la tua pagina diventi interattiva è troppo lungo. Ottimizza il caricamento delle risorse e riduci i tempi di esecuzione del codice.";
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">Time to Interactive (TTI)</h2>
      <p>Il Time to Interactive (TTI) misura il tempo necessario affinché la tua pagina diventi completamente interattiva. Un basso TTI significa che gli utenti possono interagire con la tua pagina senza ritardi.</p>
      <p className="mt-2"><strong>Risultato:</strong> {score} secondi</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default TimeToInteractive;
