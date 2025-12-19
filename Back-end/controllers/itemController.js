const Item = require('../models/Item');
const multer = require('multer');

// Create Lost or Found Item
exports.createItem = async (req, res) => {
  try {
    const { name, category, color, description, location, date, email, phoneNumber, status } = req.body;
    
    const newItem = new Item({
      name,
      category,
      color,
      description,
      location,
      date,
      email,
      phoneNumber,
      status,
      photo: req.file ? req.file.path : null
    });

    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all items (optionally filter by status)
exports.getItems = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const items = await Item.find(filter).sort({ date: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
