require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const studyRoutes = require('./routes/studyRoutes');

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
            courses: '/api/courses'
        }
    });
});

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/study', studyRoutes);


//PLS JUST LET IT I KNOW IT'S NOT ITS PLACE
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: 'File upload error',
            error: err.message
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
});


// Error handler (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
