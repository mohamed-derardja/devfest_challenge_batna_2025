const mongoose = require('mongoose');

const newsUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  category: {
    type: String,
    enum: ['academic', 'administrative', 'event', 'policy', 'facility'],
    required: true
  },
  impact: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  affectedStudents: {
    type: String,
    default: 'All Students'
  },
  changes: [String],
  publishDate: {
    type: Date,
    default: Date.now
  },
  effectiveDate: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  attachments: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NewsUpdate', newsUpdateSchema);
