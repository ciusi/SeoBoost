const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const auth = require('../middleware/auth');
const axios = require('axios');

// Funzione per pulire le chiavi degli oggetti 
const cleanKeys = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(cleanKeys);
  return Object.keys(obj).reduce((acc, key) => {
    const cleanKey = key.replace(/\./g, '_');
    acc[cleanKey] = cleanKeys(obj[key]);
    return acc;
  }, {});
};

// Rotta per creare nuova audit (protetta)
router.post('/', auth, async (req, res) => {
  let { url } = req.body;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  const apiKey = process.env.PAGESPEED_API_KEY;
  const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;

  try {
    console.log('Received URL:', url);
    console.log('API Endpoint:', apiEndpoint);

    const apiResponse = await axios.get(apiEndpoint);
    console.log('API Response:', apiResponse.data);

    // Pulisce le chiavi della risposta
    const cleanedResults = cleanKeys(apiResponse.data);
    console.log('Cleaned API Response:', cleanedResults);

    const newAudit = new Audit({
      url,
      results: cleanedResults
    });
    const audit = await newAudit.save();
    res.json(audit);
  } catch (err) {
    console.error('Error during API call:', err.message);
    res.status(500).send('Server error');
  }
});

// Rotta per ottenere i risultati dell'audit (protetta)
router.get('/:id', auth, async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id);
    if (!audit) {
      return res.status(404).json({ msg: 'Audit not found' });
    }
    res.json(audit);
  } catch (err) {
    console.error('Error fetching audit:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
