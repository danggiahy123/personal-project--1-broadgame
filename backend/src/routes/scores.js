const express = require('express');
const auth = require('../middleware/auth');
const Score = require('../models/Score');

const router = express.Router();

// Submit score
router.post('/', auth, async (req, res) => {
  try {
    const { gameId, score, timeSpent, level } = req.body;

    const scoreData = new Score({
      userId: req.userId,
      gameId,
      score,
      timeSpent,
      level
    });

    await scoreData.save();

    res.status(201).json({
      message: 'Score submitted successfully',
      score: scoreData
    });
  } catch (error) {
    console.error('Submit score error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user scores
router.get('/my-scores', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const scores = await Score.find({ userId: req.userId })
      .populate('gameId', 'name thumbnail category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Score.countDocuments({ userId: req.userId });

    res.json({
      scores,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user scores error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get game leaderboard
router.get('/game/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const scores = await Score.find({ gameId })
      .populate('userId', 'username avatar')
      .sort({ score: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Score.countDocuments({ gameId });

    res.json({
      scores,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get game leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
