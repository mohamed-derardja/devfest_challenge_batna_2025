require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const studyRoutes = require('./routes/studyRoutes');
const authRoutes = require('./routes/auth');

// Initialize Express app
const app = express();

// Trust proxy for rate limiting behind reverse proxy (Vercel, etc.)
app.set('trust proxy', 1);

// Connect to database unless running tests (tests will manage connection)
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for Swagger UI compatibility
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit requests per window
    message: { success: false, error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging (skip in test environment)
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'DevFest Challenge Batna 2025 API',
        version: '1.0.0',
        documentation: '/api-docs',
        health: '/health',
        endpoints: {
            students: '/api/students',
            courses: '/api/courses',
            study: '/api/study'
        }
    });
});

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/auth', authRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handler (should be last)
app.use(errorHandler);

// Start server (only in non-serverless environments)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received. Shutting down gracefully...');
        server.close(() => {
            console.log('Process terminated');
            process.exit(0);
        });
    });
}

// Export for Vercel serverless
module.exports = app;
