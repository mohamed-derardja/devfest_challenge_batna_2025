const mongoose = require('mongoose');
const User = require('./User');

const universityStaffSchema = new mongoose.Schema(
    {
        position: { type: String, trim: true }
    },
    { timestamps: true }
);

// Use 'UniversityStaff' as discriminator value for userType field
module.exports = User.discriminator('UniversityStaff', universityStaffSchema, 'UniversityStaff');
