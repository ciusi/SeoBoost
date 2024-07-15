const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const SeoInAudit = require('../models/SeoInAudit');
const puppeteer = require('puppeteer');

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

      const seoInResults = await page.evaluate(() => {
        const getMetaContent = (name) => {
          const meta = document.querySelector(`meta[name="${name}"]`);
          return meta ? meta.getAttribute('content') : '';
        };

        const getTextContent = () => {
          return document.body.innerText || '';
        };

        const countKeywords = (text) => {
          const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3); // Filter short words
          const frequency = {};
          words.forEach(word => {
            if (frequency[word]) {
              frequency[word]++;
            } else {
              frequency[word] = 1;
            }
          });
          return frequency;
        };

        const analyzeMetaTagContent = (content) => {
          const words = content.split(' ');
          const readability = words.length < 10 ? 'Troppo breve! Aggiungi altre parole!' : words.length > 50 ? 'Troppo lunga: sii breve, vai dritto al sodo' : 'Bene così, ottimo lavoro!';
          const keywordDensity = countKeywords(content);
          return {
            length: content.length,
            readability,
            keywordDensity
          };
        };

        const textContent = getTextContent();
        const keywordsFrequency = countKeywords(textContent);

        const sortedKeywords = Object.keys(keywordsFrequency)
          .sort((a, b) => keywordsFrequency[b] - keywordsFrequency[a])
          .slice(0, 10) // Get top 10 keywords
          .map(keyword => ({ keyword, count: keywordsFrequency[keyword] }));

        const h1 = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
        const h2 = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim());

        // Valutazione dei meta tag
        const title = document.title || '';
        const description = getMetaContent('description') || '';

        const metaTagsAnalysis = {
          title: {
            present: !!title,
            content: analyzeMetaTagContent(title),
            quality: title.length > 10 && title.length < 70 ? 'Ottimo' : 'Da migliorare'
          },
          description: {
            present: !!description,
            content: analyzeMetaTagContent(description),
            quality: description.length > 50 && description.length < 160 ? 'Ottimo' : 'Da migliorare'
          }
        };

        // Valutazione degli headings
        const headingsAnalysis = {
          h1: {
            count: h1.length,
            tooMany: h1.length > 1,
            empty: h1.some(text => text.trim() === ''),
          },
          h2: {
            count: h2.length,
            empty: h2.some(text => text.trim() === ''),
          },
        };

        return {
          protocol: location.protocol.replace(':', ''),
          keywords: getMetaContent('keywords') ? getMetaContent('keywords').split(',').filter(keyword => keyword.trim() !== '') : [],
          metaTags: {
            title,
            description,
            analysis: metaTagsAnalysis
          },
          headings: {
            h1,
            h2,
            analysis: headingsAnalysis,
          },
          keywordSummary: sortedKeywords
        };
      });

      await browser.close();

      // Salva i risultati nel database
      const newAudit = new SeoInAudit({
        url,
        results: seoInResults
      });
      const audit = await newAudit.save();
      console.log('Saved Audit:', audit); // Log per verificare il salvataggio

      res.json(audit);
    } catch (err) {
      console.error('Error fetching SEO-in results:', err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
