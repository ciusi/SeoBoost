const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function (req, res, next) {
  // Ottieni il token dall'header
  const token = req.header('Authorization');

  // Controlla se non esiste un token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verifica il token
  try {
    const decoded = jwt.verify(token.split(' ')[1], keys.secretOrKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
