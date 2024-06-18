const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // Aggiungi altri campi necessari per l'audit
});

module.exports = mongoose.model('Audit', AuditSchema);
