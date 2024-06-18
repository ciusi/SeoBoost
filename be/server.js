const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const passport = require('passport');

// Carica le variabili di ambiente
dotenv.config();

// Connetti al database
connectDB();

const app = express();

// Middleware per il parsing dei dati JSON
app.use(express.json());

// Inizializzazione di Passport
app.use(passport.initialize());
// Configurazione di Passport
require('./config/passport')(passport);

// Rotte
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/audits', require('./routes/audit'));
app.use('/api/users', require('./routes/user'));

// Porta del server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
