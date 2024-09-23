// backend/models/Quiz.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
});

module.exports = mongoose.model('Quiz', QuizSchema);
