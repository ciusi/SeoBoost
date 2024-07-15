const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['SEO in', 'SEO Off', 'Core Vitals'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  coverImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Article', articleSchema);
