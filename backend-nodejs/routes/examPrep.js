const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_MODEL = (process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL).replace(/^models\//, '');

// Generate Quiz using Gemini AI
router.post('/quiz/generate', auth, async (req, res) => {
  try {
    const { subject, content, difficulty, numQuestions } = req.body;
    const questionCount = numQuestions || 5;
    
    if (!content || content.trim().length < 50) {
      return res.status(400).json({ 
        message: 'Content is required and must be at least 50 characters' 
      });
    }

    // Create prompt for Gemini AI
    const prompt = `You are an expert educator. Generate exactly ${questionCount} multiple-choice quiz questions based on the following content. 
    
Subject: ${subject || 'General'}
Difficulty: ${difficulty || 'medium'}

Content:
${content}

Generate questions that test understanding of the key concepts in this content. For each question, provide:
1. A clear question
2. Four answer options (labeled A, B, C, D)
3. The correct answer (as a letter: A, B, C, or D)
4. A brief explanation of why the answer is correct

Return your response ONLY as a valid JSON array with this exact structure:
[
  {
    "question": "question text here",
    "options": ["option A", "option B", "option C", "option D"],
    "correctAnswer": "A",
    "explanation": "explanation text here"
  }
]

IMPORTANT: Return ONLY the JSON array, no other text before or after.`;

    // Call Gemini AI
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiText = response.text();
    
    console.log('AI Raw Response:', aiText);
    
    // Clean up the response - remove markdown code blocks if present
    aiText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON response
    let questions;
    try {
      questions = JSON.parse(aiText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('AI Text:', aiText);
      return res.status(500).json({ 
        message: 'AI generated invalid response format',
        error: parseError.message 
      });
    }

    // Validate questions structure
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ 
        message: 'AI did not generate valid questions' 
      });
    }

    res.json({
      id: Date.now().toString(),
      subject: subject || 'General',
      difficulty: difficulty || 'medium',
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate quiz', 
      error: error.message 
    });
  }
});

// Summarize text using Gemini AI
router.post('/summarize', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Text is required' });
    }

    if (text.trim().length < 50) {
      return res.status(400).json({ 
        message: 'Text must be at least 50 characters for meaningful analysis' 
      });
    }

    // Create prompt for Gemini AI
    const prompt = `You are an expert at analyzing and summarizing educational content. Analyze the following text and provide a comprehensive summary.

Text to analyze:
${text}

Provide your analysis in the following JSON format:
{
  "title": "A concise title that captures the main topic (max 10 words)",
  "overview": "A brief overview paragraph summarizing the entire content (2-3 sentences)",
  "keyPoints": ["key point 1", "key point 2", "key point 3", "key point 4", "key point 5", "key point 6"],
  "actionItems": ["suggested action 1", "suggested action 2", "suggested action 3", "suggested action 4"]
}

Guidelines:
- Extract 6-8 key points that capture the most important information
- Create 4-5 actionable items for studying or applying this knowledge
- Make the overview comprehensive but concise
- Ensure all content is directly based on the provided text

Return ONLY the JSON object, no other text before or after.`;

    // Call Gemini AI
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiText = response.text();
    
    console.log('AI Summary Raw Response:', aiText);
    
    // Clean up the response - remove markdown code blocks if present
    aiText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON response
    let summaryData;
    try {
      summaryData = JSON.parse(aiText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('AI Text:', aiText);
      return res.status(500).json({ 
        message: 'AI generated invalid response format',
        error: parseError.message 
      });
    }

    // Validate summary structure
    if (!summaryData.title || !summaryData.overview || !summaryData.keyPoints) {
      return res.status(500).json({ 
        message: 'AI did not generate complete summary' 
      });
    }

    res.json({
      id: Date.now().toString(),
      summary: {
        title: summaryData.title,
        overview: summaryData.overview,
        keyPoints: Array.isArray(summaryData.keyPoints) ? summaryData.keyPoints : [],
        actionItems: Array.isArray(summaryData.actionItems) ? summaryData.actionItems : []
      },
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ 
      message: 'Failed to summarize text', 
      error: error.message 
    });
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
