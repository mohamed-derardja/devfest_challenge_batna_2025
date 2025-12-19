const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const auth = require('../middleware/auth');

// Get all documents/opportunities
router.get('/', auth, async (req, res) => {
  try {
    const { type, status, field, search } = req.query;
    let filter = {};
    
    if (type) filter.type = type;
    if (status) filter.status = status;
    else filter.status = 'active';
    if (field) filter.field = field;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } }
      ];
    }

    const documents = await Document.find(filter).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single document
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create document/opportunity
router.post('/', auth, async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// AI-powered document search and recommendations
router.post('/search/ai', auth, async (req, res) => {
  try {
    const { query, userProfile } = req.body;
    
    const genAI = req.app.locals.genAI;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Get all active documents
    const documents = await Document.find({ status: 'active' });

    const prompt = `Based on this user query: "${query}"
    
    And these available opportunities:
    ${documents.map((doc, i) => `${i + 1}. ${doc.title} - ${doc.type} - ${doc.organization || doc.provider || 'N/A'}`).join('\n')}
    
    Recommend the top 5 most relevant opportunities and explain why they match.
    Format as JSON:
    {
      "recommendations": [
        {
          "index": 1,
          "relevanceScore": 95,
          "reason": "Why this matches"
        }
      ],
      "insights": "General advice for the user"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let aiResponse;
    try {
      aiResponse = JSON.parse(text);
    } catch (e) {
      aiResponse = {
        recommendations: [],
        insights: text
      };
    }

    // Map recommendations to actual documents
    const recommendedDocs = aiResponse.recommendations.map(rec => {
      const doc = documents[rec.index - 1];
      return {
        ...doc.toObject(),
        relevanceScore: rec.relevanceScore,
        aiReason: rec.reason
      };
    });

    res.json({
      documents: recommendedDocs,
      insights: aiResponse.insights
    });
  } catch (error) {
    res.status(500).json({ message: 'AI search failed', error: error.message });
  }
});

// Get scholarships
router.get('/type/scholarships', auth, async (req, res) => {
  try {
    const scholarships = await Document.find({ 
      type: 'scholarship',
      status: 'active'
    }).sort({ deadline: 1 });

    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get internships
router.get('/type/internships', auth, async (req, res) => {
  try {
    const internships = await Document.find({ 
      type: 'internship',
      status: 'active'
    }).sort({ deadline: 1 });

    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get grants
router.get('/type/grants', auth, async (req, res) => {
  try {
    const grants = await Document.find({ 
      type: 'grant',
      status: 'active'
    }).sort({ deadline: 1 });

    res.json(grants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Track application
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.applicants += 1;
    await document.save();

    res.json({ 
      message: 'Application tracked',
      applicants: document.applicants
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
