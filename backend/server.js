const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/human_ads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Ad Schema
const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  contactName: String,
  contactEmail: String,
  location: String,
  imageUrl: String,
  postedAt: { type: Date, default: Date.now },
});

const Ad = mongoose.model('Ad', adSchema);

// API: Get all ads
app.get('/api/ads', async (req, res) => {
  const ads = await Ad.find().sort({ postedAt: -1 });
  res.json(ads);
});

// API: Post a new ad
app.post('/api/ads', async (req, res) => {
  const ad = new Ad(req.body);
  await ad.save();
  res.json(ad);
});

// API: Get a specific ad
app.get('/api/ads/:id', async (req, res) => {
  const ad = await Ad.findById(req.params.id);
  res.json(ad);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
