const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['scholarship', 'internship', 'job', 'grant', 'book', 'course', 'research'],
    required: true
  },
  provider: String,
  organization: String,
  deadline: Date,
  location: String,
  requirements: [String],
  benefits: [String],
  url: String,
  applicationLink: String,
  amount: String, // For scholarships/grants
  duration: String,
  field: String, // Field of study
  eligibility: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  applicants: {
    type: Number,
    default: 0
  },
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'closed', 'upcoming'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);
