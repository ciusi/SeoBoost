const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const passport = require('passport');
const session = require('express-session'); // Importa express-session

// Caricare le variabili di ambiente
dotenv.config();

// Connessione al database
connectDB();

const app = express();

// Middleware per parsing dati JSON
app.use(express.json());

// Abilita CORS per tutte le richieste
app.use(cors());

// Configura express-session
app.use(session({
  secret: process.env.SECRET_OR_KEY, // Utilizza il tuo secret
  resave: false,
  saveUninitialized: true
}));

// Inizializzazione Passport
app.use(passport.initialize());
app.use(passport.session()); // Aggiungi questa riga per il supporto delle sessioni

// Configurazione Passport
require('./config/passport')(passport);

// Rotte
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/audits', require('./routes/audit'));
app.use('/api/users', require('./routes/user'));
app.use('/api/reset-password', require('./routes/resetPassword')); // Aggiungi questa linea

// Porta server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
