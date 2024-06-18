const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], keys.secretOrKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
