const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const Reward = require('../models/Reward');
const auth = require('../middleware/auth');

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  try {
    const { name, bio, avatar, department, enrollmentYear } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (department) user.department = department;
    if (enrollmentYear) user.enrollmentYear = enrollmentYear;

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    const completedTasks = await Task.countDocuments({
      'completedBy.user': req.user.userId
    });

    const redeemedRewards = await Reward.countDocuments({
      'redeemedBy.user': req.user.userId
    });

    const userRank = await User.countDocuments({ 
      points: { $gt: user.points } 
    }) + 1;

    const totalUsers = await User.countDocuments();

    // Calculate this week's points
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const thisWeekTasks = await Task.find({
      'completedBy': {
        $elemMatch: {
          user: req.user.userId,
          completedAt: { $gte: oneWeekAgo }
        }
      }
    });

    const thisWeekPoints = thisWeekTasks.reduce((sum, task) => sum + task.points, 0);

    res.json({
      totalPoints: user.points,
      completedTasks,
      redeemedRewards,
      rank: userRank,
      totalUsers,
      thisWeekPoints,
      percentile: Math.round(((totalUsers - userRank) / totalUsers) * 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user activity history
router.get('/activity', auth, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get completed tasks
    const tasks = await Task.find({
      'completedBy.user': req.user.userId
    })
    .select('title points completedBy')
    .sort({ 'completedBy.completedAt': -1 })
    .limit(parseInt(limit));

    const taskActivity = tasks.map(task => {
      const completion = task.completedBy.find(
        c => c.user.toString() === req.user.userId
      );
      
      return {
        type: 'task_completed',
        title: task.title,
        points: task.points,
        timestamp: completion.completedAt
      };
    });

    // Get redeemed rewards
    const rewards = await Reward.find({
      'redeemedBy.user': req.user.userId
    })
    .select('name points redeemedBy')
    .sort({ 'redeemedBy.redeemedAt': -1 })
    .limit(parseInt(limit));

    const rewardActivity = rewards.map(reward => {
      const redemption = reward.redeemedBy.find(
        r => r.user.toString() === req.user.userId
      );
      
      return {
        type: 'reward_redeemed',
        title: reward.name,
        points: -reward.points,
        timestamp: redemption.redeemedAt
      };
    });

    // Combine and sort by timestamp
    const allActivity = [...taskActivity, ...rewardActivity]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.json(allActivity);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Change password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both passwords required' });
    }

    const user = await User.findById(req.user.userId);
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user badges/achievements
router.get('/achievements', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const completedTasks = await Task.countDocuments({
      'completedBy.user': req.user.userId
    });

    const achievements = [];

    // Points milestones
    if (user.points >= 100) achievements.push({ 
      name: 'Centurion', 
      description: 'Earned 100 points',
      icon: '🎯'
    });
    if (user.points >= 500) achievements.push({ 
      name: 'Point Master', 
      description: 'Earned 500 points',
      icon: '⭐'
    });
    if (user.points >= 1000) achievements.push({ 
      name: 'Champion', 
      description: 'Earned 1000 points',
      icon: '🏆'
    });

    // Task milestones
    if (completedTasks >= 5) achievements.push({ 
      name: 'Go-Getter', 
      description: 'Completed 5 tasks',
      icon: '✅'
    });
    if (completedTasks >= 10) achievements.push({ 
      name: 'Task Master', 
      description: 'Completed 10 tasks',
      icon: '🎖️'
    });
    if (completedTasks >= 25) achievements.push({ 
      name: 'Overachiever', 
      description: 'Completed 25 tasks',
      icon: '🌟'
    });

    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
