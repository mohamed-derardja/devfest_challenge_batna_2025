const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const err = new Error('Not authorized, token missing');
            err.statusCode = 401;
            return next(err);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            const err = new Error('Not authorized, user not found');
            err.statusCode = 401;
            return next(err);
        }
        req.user = user;
        next();
    } catch (e) {
        const err = new Error('Not authorized');
        err.statusCode = 401;
        return next(err);
    }
};

exports.authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        const err = new Error('Not authorized');
        err.statusCode = 401;
        return next(err);
    }
    if (!roles.includes(req.user.role)) {
        const err = new Error('Forbidden: insufficient role');
        err.statusCode = 403;
        return next(err);
    }
    next();
};
