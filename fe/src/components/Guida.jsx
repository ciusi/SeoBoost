import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Guida = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-8">Guida all'Uso di SeoBoost</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Cos'è SeoBoost?</h2>
            <p className="text-lg">
              SeoBoost è una web app progettata per offrire audit SEO avanzati per PMI e liberi professionisti. L'app semplifica concetti complessi della SEO in-site e off-site, fornendo un'analisi dettagliata delle prestazioni del sito web e suggerendo miglioramenti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Come Funziona?</h2>
            <p className="text-lg">
              Per iniziare, inserisci l'URL del tuo sito web nella barra di ricerca e avvia l'analisi. SeoBoost utilizzerà le API di Google PageSpeed Insights per valutare la velocità e l'ottimizzazione del tuo sito. Riceverai un riepilogo dei risultati direttamente sulla dashboard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Caratteristiche Principali</h2>
            <ul className="list-disc list-inside text-lg">
              <li>Analisi dettagliata delle prestazioni del sito web.</li>
              <li>Suggerimenti personalizzati per migliorare l'ottimizzazione SEO.</li>
              <li>Implementazione di tooltip informativi per aiutarti a comprendere meglio le metriche SEO.</li>
              <li>Integrazione semplice e veloce con le API di Google PageSpeed Insights.</li>
            </ul>
          </section>

          {/* Pulsante per l'audit */}
          <div className="mb-8 text-center">
            <Link to="/audit">
              <button className="bg-main text-white px-4 py-2 rounded hover:bg-main-dark transition duration-300 ease-in-out">
                Esegui l'audit ora
              </button>
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guida;
