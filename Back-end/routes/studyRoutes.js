// routes/studyRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const studyController = require('../controllers/studyController');
const axios = require('axios');

// Simple test endpoint
router.get('/test-simple', async (req, res) => {
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        // Try gemini-1.0-pro first (most reliable for free tier)
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await axios.post(apiUrl, {
            contents: [{
                parts: [{ text: "Hello, are you working? Just say 'Yes, I am working!'" }]
            }]
        }, {
            timeout: 10000
        });
        
        const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        res.json({
            success: true,
            message: 'Gemini API is working!',
            model: 'gemini-1.0-pro',
            response: aiResponse
        });
        
    } catch (error) {
        console.error('Test error:', error.response?.data || error.message);
        
        res.json({
            success: false,
            message: 'API test failed',
            error: error.response?.data?.error?.message || error.message,
            suggestion: 'Try using gemini-pro instead of gemini-1.0-pro'
        });
    }
});

// Try gemini-pro endpoint
router.get('/test-gemini-pro', async (req, res) => {
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        // Try simple gemini-pro
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await axios.post(apiUrl, {
            contents: [{
                parts: [{ text: "Hello! If you can read this, say 'Gemini Pro is working!'" }]
            }]
        }, {
            timeout: 10000
        });
        
        const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        res.json({
            success: true,
            message: 'Gemini Pro is working!',
            model: 'gemini-pro',
            response: aiResponse
        });
        
    } catch (error) {
        console.error('Gemini Pro test error:', error.response?.data || error.message);
        
        res.json({
            success: false,
            message: 'Gemini Pro test failed',
            error: error.response?.data?.error?.message || error.message
        });
    }
});

// Main study assistant endpoint
router.post('/', upload.single('document'), studyController.studyAssistant);

module.exports = router;