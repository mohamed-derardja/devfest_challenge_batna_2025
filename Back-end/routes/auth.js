const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerStudent, registerTeacher, registerStaff, login, me } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

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

router.post('/register', validate(registerStudentRules), registerStudent);
router.post('/register/teacher', protect, authorize('staff'), validate(registerTeacherRules), registerTeacher);
router.post('/register/staff', protect, authorize('staff'), validate(registerStaffRules), registerStaff);
router.post('/login', validate(loginRules), login);
router.get('/me', protect, me);

module.exports = router;
