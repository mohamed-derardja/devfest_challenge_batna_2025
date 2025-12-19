const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth-nodejs');

// Mock notifications storage (replace with database)
let notifications = [];

// Get all notifications
router.get('/', auth, async (req, res) => {
  try {
    const userNotifications = notifications.filter(n => n.userId === req.user.userId);
    res.json(userNotifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get unread count
router.get('/unread-count', auth, async (req, res) => {
  try {
    const count = notifications.filter(
      n => n.userId === req.user.userId && !n.read
    ).length;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = notifications.find(
      n => n.id === req.params.id && n.userId === req.user.userId
    );
    if (notification) {
      notification.read = true;
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
