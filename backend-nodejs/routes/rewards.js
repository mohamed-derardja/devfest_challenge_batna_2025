const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Reward = require('../models/Reward');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all tasks
router.get('/tasks', auth, async (req, res) => {
  try {
    const { category, difficulty, status } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;
    else filter.status = 'active'; // Default to active tasks

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's completed tasks
router.get('/tasks/completed', auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      'completedBy.user': req.user.userId
    }).sort({ 'completedBy.completedAt': -1 });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Complete a task
router.post('/tasks/:id/complete', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if already completed by user
    const alreadyCompleted = task.completedBy.some(
      c => c.user.toString() === req.user.userId
    );

    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Task already completed' });
    }

    // Add to completed list
    task.completedBy.push({
      user: req.user.userId,
      completedAt: new Date()
    });

    await task.save();

    // Update user points
    await User.findByIdAndUpdate(
      req.user.userId,
      { $inc: { points: task.points } }
    );

    res.json({ 
      message: 'Task completed successfully',
      pointsEarned: task.points
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all rewards
router.get('/rewards', auth, async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    else filter.status = { $ne: 'out_of_stock' };

    const rewards = await Reward.find(filter).sort({ points: 1 });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Redeem a reward
router.post('/rewards/:id/redeem', auth, async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    const user = await User.findById(req.user.userId);

    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (reward.status === 'out_of_stock') {
      return res.status(400).json({ message: 'Reward out of stock' });
    }

    if (user.points < reward.points) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Check stock
    if (reward.stock > 0) {
      if (reward.stock <= 1) {
        reward.status = 'out_of_stock';
      }
      reward.stock -= 1;
    }

    // Generate redemption code
    const code = `RWD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Add to redeemed list
    reward.redeemedBy.push({
      user: req.user.userId,
      redeemedAt: new Date(),
      code
    });

    await reward.save();

    // Deduct points from user
    user.points -= reward.points;
    await user.save();

    res.json({
      message: 'Reward redeemed successfully',
      code,
      reward: {
        name: reward.name,
        description: reward.description
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's redeemed rewards
router.get('/rewards/redeemed', auth, async (req, res) => {
  try {
    const rewards = await Reward.find({
      'redeemedBy.user': req.user.userId
    }).select('name description category redeemedBy');

    const userRewards = rewards.map(reward => {
      const redemption = reward.redeemedBy.find(
        r => r.user.toString() === req.user.userId
      );
      
      return {
        id: reward._id,
        name: reward.name,
        description: reward.description,
        category: reward.category,
        redeemedAt: redemption.redeemedAt,
        code: redemption.code
      };
    });

    res.json(userRewards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const leaderboard = await User.find()
      .select('name email role points avatar')
      .sort({ points: -1 })
      .limit(parseInt(limit));

    const usersWithRank = leaderboard.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
      avatar: user.avatar
    }));

    res.json(usersWithRank);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    const completedTasks = await Task.find({
      'completedBy.user': req.user.userId
    }).countDocuments();

    const redeemedRewards = await Reward.find({
      'redeemedBy.user': req.user.userId
    }).countDocuments();

    const totalPointsEarned = await Task.aggregate([
      { $match: { 'completedBy.user': mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: null, total: { $sum: '$points' } } }
    ]);

    const userRank = await User.countDocuments({ points: { $gt: user.points } }) + 1;

    res.json({
      currentPoints: user.points,
      completedTasks,
      redeemedRewards,
      totalPointsEarned: totalPointsEarned[0]?.total || 0,
      rank: userRank
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
