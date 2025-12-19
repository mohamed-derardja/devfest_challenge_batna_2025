require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const lostFoundRoutes = require('./routes/lostFound');
const examPrepRoutes = require('./routes/examPrep');
const notificationRoutes = require('./routes/notifications');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/exam-prep', examPrepRoutes);
app.use('/api/notifications', notificationRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Student Platform API with Gemini AI',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      lostFound: '/api/lost-found',
      examPrep: '/api/exam-prep',
      notifications: '/api/notifications'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    geminiAI: !!process.env.GEMINI_API_KEY
  });
});

// Export Gemini AI instance
app.locals.genAI = genAI;

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🤖 Gemini AI: ${process.env.GEMINI_API_KEY ? 'Enabled' : 'Disabled'}`);
  console.log(`💾 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});

module.exports = app;
