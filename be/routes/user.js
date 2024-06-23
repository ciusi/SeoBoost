const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const keys = require('../config/keys');
const createTransporter = require('../config/emailTransporter');
const crypto = require('crypto');

// Funzione per inviare email di conferma
const sendConfirmationEmail = async (email, token) => {
  const url = `http://localhost:3000/confirmation/${token}`;

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `SeoBoost <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Conferma la tua registrazione',
      html: `Per favore conferma la tua registrazione cliccando <a href="${url}">qui</a>.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Errore durante l\'invio dell\'email di conferma:', err);
      } else {
        console.log('Email di conferma inviata:', info.response);
      }
    });
  } catch (error) {
    console.error('Errore durante la creazione del trasportatore:', error);
  }
};

// Rotta per confermare la registrazione
router.get('/confirmation/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, keys.secretOrKey);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }

    user.isConfirmed = true; // Campo per indicare che l'utente è confermato
    await user.save();

    // Reindirizza l'utente alla pagina di Audit
    res.redirect('http://localhost:3000/audit');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Errore del server' });
  }
});

// Registrazione utente
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        isConfirmed: false // Inizialmente non confermato
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' });

      // Invia email di conferma
      await sendConfirmationEmail(email, token);

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Funzione per inviare email di reset password
const sendResetPasswordEmail = async (email, token) => {
  const url = `http://localhost:3000/reset-password/${token}`;

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `SeoBoost <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Resetta la tua password',
      html: `Per favore resetta la tua password cliccando <a href="${url}">qui</a>.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Errore durante l\'invio dell\'email di reset password:', err);
      } else {
        console.log('Email di reset password inviata:', info.response);
      }
    });
  } catch (error) {
    console.error('Errore durante la creazione del trasportatore:', error);
  }
};

// Rotta per richiedere il reset della password
router.post('/reset-password/request-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 ora

    await user.save();

    await sendResetPasswordEmail(email, token);

    res.status(200).json({ msg: 'Email di recupero inviata' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore del server');
  }
});

// Rotta per resettare la password
router.post('/reset-password/reset', async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Token di reset password non valido o scaduto' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ msg: 'Password reimpostata con successo' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Errore del server');
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Reindirizza l'utente alla pagina di Audit
    res.redirect('http://localhost:3000/audit');
  }
);

module.exports = router;
