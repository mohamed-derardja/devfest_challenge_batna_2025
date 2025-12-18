require('dotenv').config();
const path = require('path');


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const aiRoutes = require('./routes/ai');
const topicRoutes = require('./routes/topics');

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'DevFest Challenge Batna 2025 API',
        version: '1.0.0',
        endpoints: {
            students: '/api/students',
            courses: '/api/courses',
            topics: '/api/topics',
            ai: '/api/ai'
        }
    });
});

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/topics', topicRoutes);

// Error handler (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
