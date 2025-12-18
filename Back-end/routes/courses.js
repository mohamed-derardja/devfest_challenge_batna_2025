const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,

    getCourseTopics,
    addTopic,
    updateTopic,
    deleteTopic
} = require('../controllers/courseController');

router.route('/')
    .get(getCourses)
    .post(createCourse);

router.route('/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse);

router.route('/:id/topics')
    .get(getCourseTopics)
    .post(addTopic);

router.route('/:id/topics/:topicId')
    .put(updateTopic)
    .delete(deleteTopic);

module.exports = router;
