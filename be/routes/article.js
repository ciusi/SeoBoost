const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

// Get articles with pagination and filtering by category
router.get('/', async (req, res) => {
  const { category, page = 1, limit = 9 } = req.query;
  const query = category ? { category } : {};
  try {
    const articles = await Article.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Article.countDocuments(query);
    res.json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new article
router.post('/', async (req, res) => {
  const { title, content, category, coverImage } = req.body;
  if (!title || !content || !category || !coverImage) {
    return res.status(400).json({ message: 'Title, content, category and coverImage are required' });
  }

  const article = new Article({
    title,
    content,
    category,
    coverImage,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
