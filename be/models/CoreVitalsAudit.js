const mongoose = require('mongoose');

const CoreVitalsSchema = new mongoose.Schema({
  largestContentfulPaint: Number,
  firstContentfulPaint: Number,
  cumulativeLayoutShift: Number,
  firstInputDelay: Number,
  timeToInteractive: Number,
  totalBlockingTime: Number,
  speedIndex: Number,
});

const CoreVitalsAuditSchema = new mongoose.Schema({
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
  coreVitals: CoreVitalsSchema,
});

module.exports = mongoose.model('CoreVitalsAudit', CoreVitalsAuditSchema);
