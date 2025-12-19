const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const auth = require('../middleware/auth-nodejs');

// Get all lost items
router.get('/lost', auth, async (req, res) => {
  try {
    const items = await LostItem.find().populate('owner', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create lost item
router.post('/lost', auth, async (req, res) => {
  try {
    const item = new LostItem({
      ...req.body,
      owner: req.user.userId
    });
    await item.save();
    await item.populate('owner', 'name email');
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all found items
router.get('/found', auth, async (req, res) => {
  try {
    const items = await FoundItem.find().populate('finder', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create found item
router.post('/found', auth, async (req, res) => {
  try {
    const item = new FoundItem({
      ...req.body,
      finder: req.user.userId
    });
    await item.save();
    await item.populate('finder', 'name email');
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// AI-powered matching using Gemini
router.get('/matches', auth, async (req, res) => {
  try {
    const lostItems = await LostItem.find({ status: 'active' });
    const foundItems = await FoundItem.find({ status: 'available' });

    const matches = [];

    // Simple keyword matching (can be enhanced with Gemini AI)
    for (const lost of lostItems) {
      for (const found of foundItems) {
        const lostWords = new Set(lost.title.toLowerCase().split(' '));
        const foundWords = new Set(found.title.toLowerCase().split(' '));
        
        const intersection = new Set([...lostWords].filter(x => foundWords.has(x)));
        const union = new Set([...lostWords, ...foundWords]);
        const similarity = intersection.size / union.size;

        if (similarity > 0.3) {
          matches.push({
            lostId: lost._id,
            foundId: found._id,
            confidence: Math.round(similarity * 100),
            lost: lost.title,
            found: found.title,
            location: found.location
          });
        }
      }
    }

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get heatmap data
router.get('/heatmap', auth, async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();
    
    const locationCounts = {};
    [...lostItems, ...foundItems].forEach(item => {
      locationCounts[item.location] = (locationCounts[item.location] || 0) + 1;
    });

    const heatmapData = Object.entries(locationCounts).map(([location, count]) => ({
      location,
      count,
      risk: count > 5 ? 'High' : count > 2 ? 'Medium' : 'Low'
    }));

    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
