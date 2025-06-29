const express = require('express');
const router = express.Router();
const SearchResult = require('../models/SearchResult');
const logger = require('../utils/logger');

// GET /api/search-results?keyword=xxx&page=1&limit=10
router.get('/search-results', async (req, res) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;
    const query = keyword ? { keyword } : {};
    
    const results = await SearchResult.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await SearchResult.countDocuments(query);
    
    res.json({
      results,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    logger.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/search-results
router.post('/search-results', async (req, res) => {
  try {
    // Vérifie si c'est un tableau ou un objet unique
    const dataToSave = Array.isArray(req.body) ? req.body : [req.body];
    
    // Validation des données
    for (const result of dataToSave) {
      if (!result.keyword || !result.title || !result.url || !result.snippet || !result.source || !result.sentiment) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          requiredFields: ['keyword', 'title', 'url', 'snippet', 'source', 'sentiment']
        });
      }
    }

    const savedResults = await SearchResult.insertMany(dataToSave);
    logger.info(`Saved ${savedResults.length} results`);
    res.status(201).json(savedResults);
  } catch (error) {
    logger.error('Error saving search results:', error);
    res.status(400).json({ error: error.message });
  }
});

// GET /api/stats/sentiment?keyword=xxx
router.get('/stats/sentiment', async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = keyword ? { keyword } : {};
    
    const stats = await SearchResult.aggregate([
      { $match: query },
      { 
        $group: {
          _id: '$sentiment',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json(stats);
  } catch (error) {
    logger.error('Error fetching sentiment stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 