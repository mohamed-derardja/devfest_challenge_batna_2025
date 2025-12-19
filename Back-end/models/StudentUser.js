const mongoose = require('mongoose');
const User = require('./User');

const studentUserSchema = new mongoose.Schema(
    {
        year: { 
            type: Number, 
            required: true,
            min: 1,
            max: 5
        },
        department: { 
            type: String, 
            required: true,
            trim: true
        },
        enrolledCourses: [{
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            enrollmentDate: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['active', 'completed', 'dropped'],
                default: 'active'
            }
        }],
        averageGrade: {
            type: Number,
            min: 0,
            max: 20,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = User.discriminator('StudentUser', studentUserSchema, 'student');
