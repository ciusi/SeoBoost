const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const passport = require('passport');

// Caricare le variabili di ambiente
dotenv.config();

// Connessione al database
connectDB();

const app = express();

// Middleware per parsing dati JSON
app.use(express.json());

// Inizializzazione Passport
app.use(passport.initialize());
// Configurazione Passport
require('./config/passport')(passport);

// Rotte
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/audits', require('./routes/audit'));
app.use('/api/users', require('./routes/user'));

// Porta server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
