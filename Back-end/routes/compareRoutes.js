const express = require('express');
const { compareItem } = require('../controllers/compareController');

const router = express.Router();

// Compare one item against database
router.post('/:id/compare', compareItem);

module.exports = router;
