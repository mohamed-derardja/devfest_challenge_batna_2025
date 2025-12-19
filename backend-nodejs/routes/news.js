const express = require('express');
const router = express.Router();
const NewsUpdate = require('../models/NewsUpdate');
const auth = require('../middleware/auth');

// Get all news updates
router.get('/', auth, async (req, res) => {
  try {
    const { category, impact } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (impact) filter.impact = impact;

    const news = await NewsUpdate.find(filter)
      .populate('author', 'name email role')
      .sort({ publishDate: -1 });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single news update
router.get('/:id', auth, async (req, res) => {
  try {
    const news = await NewsUpdate.findById(req.params.id)
      .populate('author', 'name email role');

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create news update (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const newsUpdate = new NewsUpdate({
      ...req.body,
      author: req.user.userId
    });

    // Use AI to generate summary if not provided
    if (!newsUpdate.summary && req.app.locals.genAI) {
      try {
        const genAI = req.app.locals.genAI;
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Summarize this news update in 1-2 sentences:
        
        Title: ${newsUpdate.title}
        Content: ${newsUpdate.content}
        
        Provide only the summary, nothing else.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        newsUpdate.summary = response.text().trim();
      } catch (aiError) {
        console.error('AI summary generation failed:', aiError);
        newsUpdate.summary = newsUpdate.content.substring(0, 200) + '...';
      }
    }

    await newsUpdate.save();
    await newsUpdate.populate('author', 'name email role');

    res.status(201).json(newsUpdate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get latest critical updates
router.get('/critical/latest', auth, async (req, res) => {
  try {
    const criticalNews = await NewsUpdate.find({ impact: 'critical' })
      .populate('author', 'name email role')
      .sort({ publishDate: -1 })
      .limit(5);

    res.json(criticalNews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
