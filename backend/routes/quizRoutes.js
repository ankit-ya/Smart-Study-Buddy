// backend/routes/quizRoutes.js
const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// Get all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
