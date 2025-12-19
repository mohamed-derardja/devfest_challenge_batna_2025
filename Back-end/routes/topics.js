const express = require('express');
const router = express.Router();
const {
    getAllTopics
} = require('../controllers/courseController');

router.route('/')
    .get(getAllTopics);

module.exports = router;
