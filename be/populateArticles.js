const mongoose = require('mongoose');
const Article = require('./models/Article');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Esci dal processo se c'è un errore di connessione
  }
};

const articles = [
  {
    title: 'Ottimizzazione On-Page: Guida Completa',
    content: 'L\'ottimizzazione on-page è una delle pratiche fondamentali per migliorare la visibilità del tuo sito sui motori di ricerca. Include tecniche come l\'uso corretto delle parole chiave, l\'ottimizzazione dei meta tag, la struttura del contenuto e l\'uso appropriato delle immagini. Implementare una solida strategia on-page può aiutarti a raggiungere un pubblico più ampio e a migliorare il posizionamento nei risultati di ricerca.',
    category: 'SEO in',
    coverImage: '/BLOGbanner.png',
  },
  {
    title: 'Strategie di Link Building Efficaci',
    content: 'Il link building è una parte essenziale del SEO off-page. Creare link di qualità da siti web autorevoli può aumentare la credibilità e l\'autorità del tuo sito. Tra le strategie più efficaci ci sono la creazione di contenuti interessanti e condivisibili, la partecipazione a blog e forum di settore e l\'uso dei social media per promuovere i tuoi contenuti.',
    category: 'SEO Off',
    coverImage: '/BLOGbanner.png',
  },
  {
    title: 'Importanza delle Core Web Vitals',
    content: 'Le Core Web Vitals sono un insieme di metriche di Google che misurano l\'esperienza utente sulle pagine web. Queste metriche includono il Largest Contentful Paint (LCP), il First Input Delay (FID) e il Cumulative Layout Shift (CLS). Ottimizzare queste metriche può migliorare l\'esperienza utente e il posizionamento nei risultati di ricerca.',
    category: 'Core Vitals',
    coverImage: '/BLOGbanner.png',
  },
  {
    title: 'Guida Completa al Keyword Research',
    content: 'Il keyword research è una delle fasi più importanti del SEO. Identificare le parole chiave giuste può aiutarti a raggiungere il tuo pubblico target e a migliorare il posizionamento del tuo sito. Utilizza strumenti come Google Keyword Planner, Ahrefs e SEMrush per trovare le parole chiave più rilevanti per il tuo settore.',
    category: 'SEO in',
    coverImage: '/BLOGbanner.png',
  },
  {
    title: 'Ottimizzazione delle Immagini per il SEO',
    content: 'L\'ottimizzazione delle immagini è fondamentale per migliorare le prestazioni del sito e il posizionamento nei risultati di ricerca. Usa formati di immagine appropriati, comprimi le immagini per ridurre i tempi di caricamento e utilizza attributi alt descrittivi per aiutare i motori di ricerca a comprendere il contenuto delle immagini.',
    category: 'SEO Off',
    coverImage: '/BLOGbanner.png',
  }
];

connectDB();

mongoose.connection.once('open', () => {
  console.log('MongoDB connected!');
  
  Article.insertMany(articles)
    .then(() => {
      console.log('Articles added successfully!');
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error adding articles:', error);
    });
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
