const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const keys = require('../config/keys');

// Registrazione utente
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.error('Missing fields:', { name, email, password });
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (user) {
      console.error('Email already exists:', email);
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error('Error generating salt:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              console.error('Error saving user:', err);
              res.status(500).json({ msg: 'Server error' });
            });
        });
      });
    }
  }).catch(err => {
    console.error('Error finding user:', err);
    res.status(500).json({ msg: 'Server error' });
  });
});

// Login utente
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.error('Error signing token:', err);
              return res.status(500).json({ msg: 'Server error' });
            }

            res.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    }).catch(err => {
      console.error('Error comparing password:', err);
      res.status(500).json({ msg: 'Server error' });
    });
  }).catch(err => {
    console.error('Error finding user:', err);
    res.status(500).json({ msg: 'Server error' });
  });
});

// Autenticazione con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication -> redirect home.
    res.redirect('/dashboard');
  }
);

module.exports = router;
