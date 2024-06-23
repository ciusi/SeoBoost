const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;  // Rende la password facoltativa se googleId è presente
    }
  },
  googleId: {
    type: String
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);
