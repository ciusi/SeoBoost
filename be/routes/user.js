const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const keys = require('../config/keys');

// Registrazione utente
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.error('Missing fields:', { name, email, password });
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.error('Email already exists:', email);
      return res.status(400).json({ email: 'Email already exists' });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    
    user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login utente
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ password: 'Password incorrect' });
    }

    const payload = { id: user.id, name: user.name };

    const token = await jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
    res.json({ success: true, token: 'Bearer ' + token });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
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
