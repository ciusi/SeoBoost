const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const keys = require('../config/keys');
const createTransporter = require('../config/emailTransporter');

// Funzione per inviare email di conferma
const sendConfirmationEmail = async (email, token) => {
  const url = `http://localhost:5000/confirmation/${token}`;

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
        password
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

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Reindirizza l'utente alla pagina audit dopo il login
    res.redirect('http://localhost:3000/audit');
  }
);

module.exports = router;
