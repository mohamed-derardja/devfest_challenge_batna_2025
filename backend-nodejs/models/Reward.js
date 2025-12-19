const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['voucher', 'service', 'merchandise', 'privilege', 'discount'],
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: -1 // -1 means unlimited
  },
  image: String,
  provider: String,
  validUntil: Date,
  status: {
    type: String,
    enum: ['available', 'limited', 'out_of_stock'],
    default: 'available'
  },
  redeemedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    redeemedAt: {
      type: Date,
      default: Date.now
    },
    code: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reward', rewardSchema);
