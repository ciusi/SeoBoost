import React from 'react';

const FirstInputDelay = ({ score }) => {
  let message = '';
  let bgColor = '';

  if (score < 100) {
    message = "Ottimo! La tua pagina risponde rapidamente alle interazioni degli utenti.";
    bgColor = 'bg-green-500';
  } else if (score < 300) {
    message = "Buona reattività, ma potrebbe essere migliorata. Riduci i tempi di esecuzione del codice per migliorare ulteriormente.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "La tua pagina impiega troppo tempo a rispondere alle interazioni iniziali. Ottimizza il codice JavaScript per migliorare la reattività.";
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">First Input Delay (FID)</h2>
      <p>Il First Input Delay (FID) misura il tempo necessario affinché la tua pagina risponda alla prima interazione dell'utente, come un clic o un tocco. Un basso FID significa che la tua pagina è reattiva.</p>
      <p className="mt-2"><strong>Risultato:</strong> {score} ms</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default FirstInputDelay;
