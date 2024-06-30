import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Cookie = () => {
  const cookiePolicyText = `
    <h1 class="text-3xl font-bold mb-4">Cookie Policy</h1>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Tipologie di Cookie Utilizzati</h2>
      <p>
        Utilizziamo diversi tipi di cookie sulla nostra web app, inclusi cookie tecnici, cookie di analisi e cookie di terze parti per migliorare l'esperienza dell'utente e per analizzare l'utilizzo del sito.
      </p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Gestione dei Cookie</h2>
      <p>
        Gli utenti possono gestire le preferenze sui cookie attraverso le impostazioni del loro browser o utilizzando strumenti di gestione dei cookie disponibili.
      </p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Cookie di Terze Parti</h2>
      <p>
        Alcuni servizi di terze parti integrati nella nostra web app possono impostare cookie sui dispositivi degli utenti. Questi cookie sono controllati dalle rispettive terze parti e soggetti alle loro politiche sulla privacy.
      </p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Aggiornamenti della Cookie Policy</h2>
      <p>
        Ci riserviamo il diritto di modificare la cookie policy. Le modifiche saranno pubblicate sulla nostra web app con una data di effetto.
      </p>
    </section>
    <section>
      <h2 class="text-xl font-semibold mb-2">Contatti</h2>
      <p>
        Per domande riguardanti la cookie policy, contattaci all'indirizzo email: <a href="mailto:info@seoboost.com" className="text-blue-500">info@seoboost.com</a>
      </p>
    </section>
  `;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8" dangerouslySetInnerHTML={{ __html: cookiePolicyText }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookie;