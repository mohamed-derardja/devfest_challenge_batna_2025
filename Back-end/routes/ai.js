const express = require('express');
const router = express.Router();
const {
    generateStudyPlan,
    summarizeTopic
} = require('../controllers/aiController');

router.post('/study-plan', generateStudyPlan);
router.post('/summarize', summarizeTopic);

module.exports = router;
