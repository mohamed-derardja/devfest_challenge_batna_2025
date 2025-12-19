const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true
    },
    messages: [{
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        metadata: {
            subject: String,
            topic: String,
            studyTime: String,
            type: {
                type: String,
                enum: ['example', 'summary', 'quiz', 'resources', 'schedule', 'general'],
                default: 'general'
            }
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    sessionStart: {
        type: Date,
        default: Date.now
    },
    sessionEnd: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: 'Study Session'
    }
}, {
    timestamps: true
});

// Keep only last 50 messages per chat (adjustable)
chatSchema.methods.addMessage = async function(message) {
    this.messages.push(message);
    
    // Keep only last 50 messages
    if (this.messages.length > 50) {
        this.messages = this.messages.slice(-50);
    }
    
    this.sessionEnd = Date.now();
    await this.save();
    return this;
};

// Get last 10 messages
chatSchema.methods.getRecentMessages = function(count = 10) {
    return this.messages.slice(-count);
};

module.exports = mongoose.model('Chat', chatSchema);