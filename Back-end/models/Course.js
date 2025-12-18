const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Topic name is required'],
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    examDate: {
        type: Date,
        required: false
    },
    resources: [{
        title: String,
        url: String,
        type: {
            type: String,
            enum: ['video', 'article', 'documentation', 'tutorial', 'other']
        }
    }],
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Course code is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    topics: [topicSchema],
    credits: {
        type: Number,
        default: 3
    },
    semester: {
        type: String,
        enum: ['Fall', 'Spring', 'Summer']
    },
    year: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
