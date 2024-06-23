import React from 'react';

const FirstContentfulPaint = ({ score }) => {
  let message = '';
  let bgColor = '';

  if (score < 1.8) {
    message = "Fantastico! Gli utenti possono vedere rapidamente il contenuto della tua pagina.";
    bgColor = 'bg-green-500';
  } else if (score < 2.5) {
    message = "Buono, ma c'è spazio per migliorare. Cerca di ottimizzare il caricamento delle risorse per migliorare la velocità.";
    bgColor = 'bg-yellow-500';
  } else {
    message = "Il primo contenuto visibile impiega troppo tempo a caricarsi. Prova a ottimizzare il caricamento delle risorse per migliorare la velocità.";
    bgColor = 'bg-red-500';
  }

  return (
    <div className={`p-4 rounded shadow ${bgColor}`}>
      <h2 className="text-xl font-bold mb-2">First Contentful Paint (FCP)</h2>
      <p>Il First Contentful Paint (FCP) misura il tempo necessario affinché il primo contenuto della pagina diventi visibile. Indica quando gli utenti possono vedere qualcosa di utile sulla tua pagina.</p>
      <p className="mt-2"><strong>Risultato:</strong> {score} secondi</p>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default FirstContentfulPaint;
