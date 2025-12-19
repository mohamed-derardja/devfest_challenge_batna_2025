const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: 1,
        max: 5
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
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
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
