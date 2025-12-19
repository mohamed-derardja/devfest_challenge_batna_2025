const errorHandler = (err, req, res, next) => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }

    // Normalize common Mongoose errors
    if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Invalid resource identifier';
    }

    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    if (err.code === 11000) {
        err.statusCode = 409;
        err.message = 'Duplicate key error';
    }

    // Handle Multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        err.statusCode = 413;
        err.message = 'File too large. Maximum file size is 10MB.';
    }

    if (err.code === 'LIMIT_FILE_TYPE') {
        err.statusCode = 415;
        err.message = err.message || 'Unsupported file type';
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        err.statusCode = 400;
        err.message = 'Unexpected file field';
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        err.message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        err.statusCode = 401;
        err.message = 'Token expired';
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
