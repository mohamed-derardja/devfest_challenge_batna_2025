const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'devfest-challenge-secret-key-2025';

// In-memory fallback users for instant local testing and offline reliability
const inMemoryUsers = [
  {
    id: 'mock-student-1',
    name: 'Test Student',
    email: 'test@university.edu',
    passwordHash: bcrypt.hashSync('test123', 10),
    role: 'student'
  },
  {
    id: 'mock-admin-1',
    name: 'System Administrator',
    email: 'admin@university.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  }
];

// Helper to check DB connectivity
const isDbConnected = () => mongoose.connection.readyState === 1;

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (isDbConnected()) {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already registered' });
        }

        const user = new User({
          email,
          password,
          name: name || email.split('@')[0],
          role: role || 'student'
        });

        await user.save();

        const token = jwt.sign(
          { userId: user._id, email: user.email, role: user.role, name: user.name },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        return res.status(201).json({
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        });
      } catch (dbErr) {
        console.warn('DB error during register, falling back to memory store:', dbErr.message);
      }
    }

    // Fallback store
    const existing = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = {
      id: 'mem-' + Date.now(),
      name: name || email.split('@')[0],
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: role || 'student'
    };
    inMemoryUsers.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (isDbConnected()) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            const token = jwt.sign(
              { userId: user._id, email: user.email, role: user.role, name: user.name },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            return res.json({
              token,
              user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
              }
            });
          }
        }
      } catch (dbErr) {
        console.warn('DB error during login, falling back to memory store:', dbErr.message);
      }
    }

    // Memory store lookup
    const memUser = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!memUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, memUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: memUser.id, email: memUser.email, role: memUser.role, name: memUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: memUser.id,
        email: memUser.email,
        name: memUser.name,
        role: memUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify Token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (isDbConnected()) {
      try {
        const user = await User.findById(decoded.userId).select('-password');
        if (user) {
          return res.json({
            valid: true,
            user: {
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          });
        }
      } catch (e) {}
    }

    // Decoded payload fallback
    res.json({
      valid: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name || decoded.email?.split('@')[0] || 'User',
        role: decoded.role || 'student'
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
