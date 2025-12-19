const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerStudent, registerTeacher, registerStaff, login, me, registerGeneral } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

// Simple registration rules (for general signup)
const registerGeneralRules = [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['student', 'teacher', 'staff']).withMessage('Invalid role')
];

const registerStudentRules = [
    body('name').isString().trim().notEmpty(),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 }),
    body('year').isInt({ min: 1, max: 5 }),
    body('department').isString().trim().notEmpty()
];

const registerTeacherRules = [
    body('name').isString().trim().notEmpty(),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 }),
    body('department').optional().isString().trim(),
    body('title').optional().isString().trim()
];

const registerStaffRules = [
    body('name').isString().trim().notEmpty(),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 6 }),
    body('position').optional().isString().trim()
];

const loginRules = [body('email').isEmail(), body('password').isString().isLength({ min: 6 })];

// General registration endpoint (used by frontend)
router.post('/register', validate(registerGeneralRules), registerGeneral);

// Role-specific registration endpoints
router.post('/register/student', validate(registerStudentRules), registerStudent);
router.post('/register/teacher', protect, authorize('staff'), validate(registerTeacherRules), registerTeacher);
router.post('/register/staff', protect, authorize('staff'), validate(registerStaffRules), registerStaff);

router.post('/login', validate(loginRules), login);
router.get('/verify', protect, (req, res) => res.status(200).json({ success: true, data: req.user }));
router.get('/me', protect, me);

module.exports = router;
