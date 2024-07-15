const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const puppeteer = require('puppeteer');
const SeoOffAudit = require('../models/SeoOffAudit');

router.post(
  '/',
  [
    check('url', 'Please include a valid URL')
      .trim()
      .custom((value) => {
        if (!value.startsWith('http://') && !value.startsWith('https://')) {
          value = 'http://' + value;
        }
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[--a-z\\d_]*)?$','i'); // fragment locator
        if (!urlPattern.test(value)) {
          throw new Error('Invalid URL');
        }
        return true;
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    let { url } = req.body;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    console.log('Received URL:', url);

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      // Scraping dei dati richiesti
      const seoOffResults = await page.evaluate(() => {
        const backlinks = Array.from(document.querySelectorAll('a')).map(link => ({
          url: link.href,
          text: link.innerText,
        }));
        const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText);
        const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.innerText);

        const domainAuthority = h1s.length + h2s.length; // Placeholder: il numero di H1 e H2 come autorità del dominio

        const socialSignals = Array.from(document.querySelectorAll('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"]')).map(link => ({
          platform: link.href.includes('facebook.com') ? 'Facebook' : link.href.includes('twitter.com') ? 'Twitter' : 'Instagram',
          url: link.href,
        }));

        const brandMentions = Array.from(document.querySelectorAll('body')).filter(el => el.innerText.includes('brand')).length; // Placeholder: conta le menzioni del brand

        const trustworthiness = backlinks.length > 20 ? 80 : backlinks.length > 10 ? 60 : 40; // Placeholder: affidabilità basata sul numero di backlink

        return {
          backlinks,
          domainAuthority,
          socialSignals,
          brandMentions,
          trustworthiness,
        };
      });

      await browser.close();

      // Salva i risultati nel database
      const newAudit = new SeoOffAudit({
        url,
        results: seoOffResults,
      });
      const audit = await newAudit.save();
      console.log('Saved Audit:', audit); // Log per verificare il salvataggio

      res.json(audit);
    } catch (err) {
      console.error('Error fetching SEO-off results:', err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
