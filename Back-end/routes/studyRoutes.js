const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // your multer config
const studyController = require('../controllers/studyController');


// Study assistant endpoint (with optional document upload)
router.post(
  '/',
  upload.single('document'),  // accept a single file named 'document'
  studyController.studyAssistant
);

// Summarization endpoint (with optional document upload)
router.post(
  '/summarize',
  upload.single('document'),
  studyController.summarizeContent
);

router.post('/resources', studyController.recommendResources);

router.post('/exam', studyController.generateExercises);
// router.get(
//     '/internships',
//     studyController.fetchInternships
// )


router.get('/interships', studyController.getInternships);
router.get('/scholarships', studyController.getScholarships);


router.post('/plan', studyController.studyPlanner);


module.exports = router;

