const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport'); 
const app = express();
require('dotenv').config();

// Connect Database
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(error => {
  console.error('Error connecting to database:', error);
});

// Middleware per parsing dati JSON
app.use(express.json({ extended: false }));

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

// Configurazione di express-session
app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Log per le richieste in arrivo
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/reset', require('./routes/reset'));
app.use('/articles', require('./routes/article'));
app.use('/audit', require('./routes/audit'));
app.use('/seoIn', require('./routes/seoIn'));
app.use('/seoOff', require('./routes/seoOff'));

// Gestione delle rotte non trovate
app.use((req, res, next) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ message: 'Route not found' });
});

// Gestione degli errori globali
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
