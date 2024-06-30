const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const passport = require('passport');
const session = require('express-session');

// Caricare le variabili di ambiente
dotenv.config();

// Connessione al database
connectDB();

const app = express();

// Middleware per parsing dati JSON
app.use(express.json());

// Configurazione delle opzioni CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL del frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // Permette di inviare cookie
  optionsSuccessStatus: 204 // Per browser (Chrome) per evitare problemi con il preflight
};

// Abilita CORS per tutte le richieste usando le opzioni configurate
app.use(cors(corsOptions));

// Configura express-session
app.use(session({
  secret: process.env.SECRET_OR_KEY, 
  resave: false,
  saveUninitialized: true
}));

// Inizializzazione Passport
app.use(passport.initialize());
app.use(passport.session()); 

// Configurazione Passport
require('./config/passport')(passport);

// Rotte
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/audits', require('./routes/audit'));
app.use('/api/users', require('./routes/user'));
app.use('/api/reset-password', require('./routes/resetPassword')); 

// Porta server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
