const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    enrollInCourse
} = require('../controllers/studentController');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

const studentIdParam = param('id').isMongoId().withMessage('Invalid student id');

const studentCreateRules = [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('year').isInt({ min: 1, max: 5 }).withMessage('Year must be between 1 and 5'),
    body('department').isString().trim().notEmpty().withMessage('Department is required'),
    body('averageGrade').optional().isFloat({ min: 0, max: 20 }).withMessage('Average grade must be between 0 and 20')
];

const studentUpdateRules = [
    studentIdParam,
    body('name').optional().isString().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('year').optional().isInt({ min: 1, max: 5 }).withMessage('Year must be between 1 and 5'),
    body('department').optional().isString().trim().notEmpty().withMessage('Department cannot be empty'),
    body('averageGrade').optional().isFloat({ min: 0, max: 20 }).withMessage('Average grade must be between 0 and 20')
];

const enrollRules = [
    studentIdParam,
    body('courseId').isMongoId().withMessage('courseId must be a valid course id')
];

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - year
 *               - department
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               year:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               department:
 *                 type: string
 *               averageGrade:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 20
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Duplicate email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/')
    .get(protect, authorize('teacher', 'staff'), getStudents)
    .post(protect, authorize('teacher', 'staff'), validate(studentCreateRules), createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid student ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               year:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               department:
 *                 type: string
 *               averageGrade:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 20
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid student ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/:id')
    .get(protect, validate([studentIdParam]), getStudent)
    .put(protect, validate(studentUpdateRules), updateStudent)
    .delete(protect, authorize('teacher', 'staff'), validate([studentIdParam]), deleteStudent);

/**
 * @swagger
 * /api/students/{id}/enroll:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course to enroll in
 *     responses:
 *       200:
 *         description: Student enrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Validation error or max active courses reached
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Student or course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Student already enrolled in this course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/enroll', protect, validate(enrollRules), enrollInCourse);

module.exports = router;
