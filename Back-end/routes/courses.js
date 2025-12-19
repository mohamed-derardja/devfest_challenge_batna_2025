const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addTopic,
    updateTopic,
    deleteTopic
} = require('../controllers/courseController');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

const courseIdParam = param('id').isMongoId().withMessage('Invalid course id');
const topicIdParam = param('topicId').optional().isMongoId().withMessage('Invalid topic id');

const courseCreateRules = [
    body('courseName').isString().trim().notEmpty().withMessage('Course name is required'),
    body('code').isString().trim().notEmpty().withMessage('Course code is required'),
    body('credits').optional().isInt({ min: 0 }).withMessage('Credits must be a non-negative integer'),
    body('semester').optional().isIn(['Fall', 'Spring', 'Summer']).withMessage('Semester must be Fall, Spring, or Summer'),
    body('year').optional().isInt({ min: 1 }).withMessage('Year must be a positive integer')
];

const courseUpdateRules = [
    courseIdParam,
    body('courseName').optional().isString().trim().notEmpty().withMessage('Course name cannot be empty'),
    body('code').optional().isString().trim().notEmpty().withMessage('Course code cannot be empty'),
    body('credits').optional().isInt({ min: 0 }).withMessage('Credits must be a non-negative integer'),
    body('semester').optional().isIn(['Fall', 'Spring', 'Summer']).withMessage('Semester must be Fall, Spring, or Summer'),
    body('year').optional().isInt({ min: 1 }).withMessage('Year must be a positive integer')
];

const topicCreateRules = [
    courseIdParam,
    body('name').isString().trim().notEmpty().withMessage('Topic name is required'),
    body('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']).withMessage('Difficulty must be Easy, Medium, or Hard'),
    body('examDate').optional().isISO8601().toDate().withMessage('examDate must be a valid date')
];

const topicUpdateRules = [
    courseIdParam,
    topicIdParam,
    body('name').optional().isString().trim().notEmpty().withMessage('Topic name cannot be empty'),
    body('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']).withMessage('Difficulty must be Easy, Medium, or Hard'),
    body('examDate').optional().isISO8601().toDate().withMessage('examDate must be a valid date')
];

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
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
 *                     $ref: '#/components/schemas/Course'
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseName
 *               - code
 *             properties:
 *               courseName:
 *                 type: string
 *               code:
 *                 type: string
 *               credits:
 *                 type: integer
 *                 minimum: 0
 *               semester:
 *                 type: string
 *                 enum: [Fall, Spring, Summer]
 *               year:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Duplicate course code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/')
    .get(getCourses)
    .post(protect, authorize('teacher', 'staff'), validate(courseCreateRules), createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid course ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *               code:
 *                 type: string
 *               credits:
 *                 type: integer
 *                 minimum: 0
 *               semester:
 *                 type: string
 *                 enum: [Fall, Spring, Summer]
 *               year:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
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
 *         description: Invalid course ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/:id')
    .get(validate([courseIdParam]), getCourse)
    .put(protect, authorize('teacher', 'staff'), validate(courseUpdateRules), updateCourse)
    .delete(protect, authorize('teacher', 'staff'), validate([courseIdParam]), deleteCourse);

/**
 * @swagger
 * /api/courses/{id}/topics:
 *   post:
 *     summary: Add a topic to a course
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               examDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Topic added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/:id/topics')
    .post(protect, authorize('teacher', 'staff'), validate(topicCreateRules), addTopic);

/**
 * @swagger
 * /api/courses/{id}/topics/{topicId}:
 *   put:
 *     summary: Update a topic in a course
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: Topic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               examDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error or invalid IDs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course or topic not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a topic from a course
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Course ID
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: Topic ID
 *     responses:
 *       200:
 *         description: Topic deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid IDs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course or topic not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/:id/topics/:topicId')
    .put(protect, authorize('teacher', 'staff'), validate(topicUpdateRules), updateTopic)
    .delete(protect, authorize('teacher', 'staff'), validate([courseIdParam, topicIdParam]), deleteTopic);

module.exports = router;
