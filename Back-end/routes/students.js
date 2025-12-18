const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    enrollInCourse
} = require('../controllers/studentController');

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);

router.post('/:id/enroll', enrollInCourse);

module.exports = router;
