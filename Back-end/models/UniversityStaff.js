const mongoose = require('mongoose');
const User = require('./User');

const universityStaffSchema = new mongoose.Schema(
    {
        position: { type: String, trim: true }
    },
    { timestamps: true }
);

module.exports = User.discriminator('UniversityStaff', universityStaffSchema, 'staff');
