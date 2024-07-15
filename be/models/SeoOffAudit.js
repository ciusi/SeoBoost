const mongoose = require('mongoose');

const SeoOffAuditSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  results: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('SeoOffAudit', SeoOffAuditSchema);
