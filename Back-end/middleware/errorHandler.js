const errorHandler = (err, req, res, next) => {
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

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
