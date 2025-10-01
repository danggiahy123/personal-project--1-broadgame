const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
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
    required: true,
    enum: ['action', 'puzzle', 'strategy', 'arcade', 'sports', 'racing']
  },
  thumbnail: {
    type: String,
    required: true
  },
  gameUrl: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 5
  },
  maxPlayers: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  statistics: {
    totalPlays: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes
gameSchema.index({ category: 1 });
gameSchema.index({ isActive: 1 });
gameSchema.index({ isFeatured: 1 });
gameSchema.index({ 'statistics.totalPlays': -1 });

module.exports = mongoose.model('Game', gameSchema);
