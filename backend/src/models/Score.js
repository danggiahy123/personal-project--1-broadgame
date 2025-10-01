const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  timeSpent: {
    type: Number, // in seconds
    required: true,
    min: 0
  },
  level: {
    type: Number,
    default: 1
  },
  achievements: [{
    type: String
  }],
  isPersonalBest: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
scoreSchema.index({ userId: 1, gameId: 1 });
scoreSchema.index({ gameId: 1, score: -1 });
scoreSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Score', scoreSchema);
