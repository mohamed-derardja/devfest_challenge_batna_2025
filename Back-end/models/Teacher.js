const mongoose = require('mongoose');
const User = require('./User');

const teacherSchema = new mongoose.Schema(
    {
        department: { type: String, trim: true },
        title: { type: String, trim: true }
    },
    { timestamps: true }
);

module.exports = User.discriminator('Teacher', teacherSchema, 'teacher');
