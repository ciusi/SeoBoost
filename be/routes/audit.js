const express = require('express');
const router = express.Router();
const Audit = require('../models/CoreVitalsAudit');
const { google } = require('googleapis');
const { check, validationResult } = require('express-validator');

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

// Configurazione della chiave API
const apiKey = process.env.PAGESPEED_API_KEY;
const pagespeedonline = google.pagespeedonline({
  version: 'v5',
  auth: apiKey,
});

router.post(
  '/',
  [
    check('url', 'Please include a valid URL').isURL(),
    check('device', 'Device must be either "mobile" or "desktop"').isIn(['mobile', 'desktop'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { url, device } = req.body;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    try {
      console.log('Received URL:', url);
      console.log('Selected device:', device);

      const apiResponse = await pagespeedonline.pagespeedapi.runpagespeed({
        url,
        strategy: device,
      });

      console.log('API Response:', apiResponse.data);

      const cleanedResults = cleanKeys(apiResponse.data);
      console.log('Cleaned API Response:', cleanedResults);

      const newAudit = new Audit({
        url,
        results: cleanedResults
      });
      const audit = await newAudit.save();

      const token = req.header('Authorization');
      if (!token) {
        const partialResults = {
          ...cleanedResults,
          auditId: audit.id,
          performance: cleanedResults.lighthouseResult.categories.performance.score,
          partial: true
        };
        return res.json(partialResults);
      } else {
        return res.json(audit);
      }
    } catch (err) {
      console.error('Error during API call:', err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/:id', async (req, res) => {
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

// Rotta di test per confermare che il percorso /audit sia attivo
router.get('/test', (req, res) => {
  res.send('Audit route is working');
});


module.exports = router;
