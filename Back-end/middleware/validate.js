const { validationResult } = require('express-validator');

// Runs provided validators then short-circuits with a 400 on first validation failure
const validate = (validators) => async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const message = errors.array().map((err) => err.msg).join(', ');
    const err = new Error(message);
    err.statusCode = 400;
    return next(err);
};

module.exports = validate;
