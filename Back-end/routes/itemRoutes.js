const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload-image');
const multer = require('multer');
const itemController = require('../controllers/itemController');

// Create item (lost or found)
router.post('/', upload.single('photo'), itemController.createItem);

// Get all items (filter optional)
router.get('/', itemController.getItems);

// Get single item by id
router.get('/:id', itemController.getItemById);

module.exports = router;
