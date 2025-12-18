const mongoose = require('mongoose');

const aiResultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    queryType: {
        type: String,
        enum: ['study-plan', 'recommendation', 'progress', 'schedule', 'other'],
        required: true
    },
    query: {
        type: String,
        required: true
    },
    result: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    confidence: {
        type: Number,
        min: 0,
        max: 1
    },
    metadata: {
        model: String,
        processingTime: Number,
        tokens: Number
    },
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    }
}, {
    timestamps: true
});

// Index for automatic expiration
aiResultSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for faster queries
aiResultSchema.index({ student: 1, course: 1, queryType: 1 });

module.exports = mongoose.model('AIResult', aiResultSchema);
