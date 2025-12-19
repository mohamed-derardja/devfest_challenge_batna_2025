const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Generate Quiz using Gemini AI
router.post('/quiz/generate', auth, async (req, res) => {
  try {
    const { subject, difficulty } = req.body;
    const genAI = req.app.locals.genAI;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate 5 ${difficulty} multiple choice questions about ${subject}. 
    Format your response as JSON with this structure:
    {
      "questions": [
        {
          "question": "question text",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "why this is correct"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON from response
    let quizData;
    try {
      quizData = JSON.parse(text);
    } catch (e) {
      // Fallback if AI doesn't return valid JSON
      quizData = {
        questions: [{
          question: `Sample ${difficulty} question about ${subject}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: 0,
          explanation: "This is the correct answer"
        }]
      };
    }

    res.json({
      id: Date.now().toString(),
      subject,
      difficulty,
      questions: quizData.questions
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ message: 'Failed to generate quiz', error: error.message });
  }
});

// Summarize text using Gemini AI
router.post('/summarize', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const genAI = req.app.locals.genAI;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Summarize this text and extract key points and action items:

    ${text}

    Provide your response as JSON:
    {
      "summary": "brief summary",
      "keyPoints": ["point 1", "point 2", ...],
      "actionItems": ["action 1", "action 2", ...]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();
    
    let summaryData;
    try {
      summaryData = JSON.parse(aiText);
    } catch (e) {
      // Fallback
      summaryData = {
        summary: text.substring(0, 200) + '...',
        keyPoints: text.split('. ').slice(0, 5),
        actionItems: ['Review the material', 'Practice problems']
      };
    }

    res.json({
      id: Date.now().toString(),
      title: 'Document Summary',
      content: text,
      ...summaryData,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ message: 'Failed to summarize', error: error.message });
  }
});

// Get learning resources
router.get('/resources', async (req, res) => {
  try {
    const { type, search } = req.query;
    
    // Mock resources (can be replaced with database query)
    const resources = [
      {
        id: '1',
        type: 'book',
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        rating: 4.8,
        description: 'Comprehensive algorithms textbook',
        url: 'https://example.com',
        thumbnail: 'https://example.com/book.jpg'
      },
      {
        id: '2',
        type: 'course',
        title: 'Machine Learning Specialization',
        platform: 'Coursera',
        rating: 4.9,
        students: 50000,
        duration: '3 months',
        description: 'Learn ML from scratch',
        url: 'https://coursera.org/ml'
      }
    ];

    let filtered = resources;
    if (type) {
      filtered = filtered.filter(r => r.type === type);
    }
    if (search) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
