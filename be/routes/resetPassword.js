const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createTransporter = require('../config/emailTransporter');
const keys = require('../config/keys');

// Funzione per inviare email di reimpostazione della password
const sendResetEmail = async (email, token) => {
  const url = `http://localhost:3000/reset-password/${token}`;

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `SeoBoost <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reimposta la tua password',
      html: `Clicca <a href="${url}">qui</a> per reimpostare la tua password.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Errore durante l\'invio dell\'email di reimpostazione della password:', err);
      } else {
        console.log('Email di reimpostazione della password inviata:', info.response);
      }
    });
  } catch (error) {
    console.error('Errore durante la creazione del trasportatore:', error);
  }
};

// Richiedi la reimpostazione della password
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' });

    await sendResetEmail(email, token);

    res.json({ msg: 'Email di reimpostazione della password inviata' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reimposta la password
router.post('/reset', async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, keys.secretOrKey);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: 'Password reimpostata con successo' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
