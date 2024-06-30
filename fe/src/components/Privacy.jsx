import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Privacy = () => {
  const privacyPolicyText = `
    <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Informazioni Raccolte</h2>
      <p>
        SeoBoost raccoglie le seguenti informazioni personali degli utenti:
      </p>
      <ul class="list-disc pl-6">
        <li>Nome</li>
        <li>Indirizzo email</li>
      </ul>
      <p>
        Queste informazioni sono necessarie per fornire il servizio di audit SEO e per inviare ai nostri utenti i report di audit tramite email.
      </p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Utilizzo delle Informazioni</h2>
      <p>
        Le informazioni personali degli utenti vengono utilizzate esclusivamente per i seguenti scopi:
      </p>
      <ul class="list-disc pl-6">
        <li>Fornire il servizio di audit SEO.</li>
        <li>Comunicare con gli utenti riguardo al servizio stesso, inclusi aggiornamenti, notizie e offerte speciali relative a SeoBoost.</li>
      </ul>
      <p>
        Assicuriamo che le informazioni personali degli utenti non verranno condivise con terze parti senza il consenso degli utenti stessi, eccetto nei casi previsti dalla legge.
      </p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Protezione delle Informazioni</h2>
      <p>
        SeoBoost si impegna a proteggere le informazioni personali degli utenti attraverso l'implementazione di misure di sicurezza appropriate.
      </p>
      <p>
        Queste misure includono, ma non si limitano a:
      </p>
      <ul class="list-disc pl-6">
        <li>Crittografia dei dati.</li>
        <li>Accesso limitato alle informazioni personali solo al personale autorizzato.</li>
        <li>Monitoraggio continuo dei sistemi per individuare e mitigare potenziali minacce alla sicurezza dei dati.</li>
      </ul>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Cookie e Tecnologie Simili</h2>
      <p>
        SeoBoost utilizza cookie e tecnologie simili per migliorare l'esperienza degli utenti sulla nostra web app.
      </p>
      <p>
        I tipi di cookie utilizzati includono:
      </p>
      <ul class="list-disc pl-6">
        <li>Cookie tecnici: necessari per il corretto funzionamento della web app.</li>
        <li>Cookie di analisi: utilizzati per raccogliere informazioni sull'utilizzo della web app e per migliorare i nostri servizi.</li>
      </ul>
      <p>
        Gli utenti possono gestire le loro preferenze sui cookie attraverso le impostazioni del browser. Tuttavia, disabilitare alcuni tipi di cookie potrebbe influire sulle funzionalità e sull'esperienza di navigazione della web app.
      </p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Modifiche alla Privacy Policy</h2>
      <p>
        SeoBoost si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento.
      </p>
      <p>
        Le modifiche saranno pubblicate sulla nostra web app e l'ultima data di aggiornamento sarà indicata in cima a questa pagina.
      </p>
      <p>
        L'utilizzo continuato della web app dopo la pubblicazione delle modifiche costituirà accettazione di tali modifiche.
      </p>
    </section>
    <section>
      <h2 class="text-xl font-semibold mb-2">Contatti</h2>
      <p>
        Per domande riguardanti questa Privacy Policy o l'utilizzo delle informazioni personali da parte di SeoBoost, contattaci all'indirizzo email: <a href="mailto:info@seoboost.com" className="text-blue-500">info@seoboost.com</a>
      </p>
    </section>
  `;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8" dangerouslySetInnerHTML={{ __html: privacyPolicyText }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
