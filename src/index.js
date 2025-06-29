const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27018/searchResults';

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'database-service' });
});

app.listen(PORT, () => {
  logger.info(`Database service running on port ${PORT}`);
}); 