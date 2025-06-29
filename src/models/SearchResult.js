const mongoose = require('mongoose');

const SearchResultSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // TTL de 1h
  }
});

// Index composé pour les recherches fréquentes
SearchResultSchema.index({ keyword: 1, createdAt: -1 });

module.exports = mongoose.model('SearchResult', SearchResultSchema); 