const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const auth = require('../middleware/auth');

// Rotta per creare un nuovo audit (protetta)
router.post('/', auth, async (req, res) => {
  const { url } = req.body;

  try {
    const newAudit = new Audit({ url });
    const audit = await newAudit.save();
    res.json(audit);
  } catch (err) {
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
