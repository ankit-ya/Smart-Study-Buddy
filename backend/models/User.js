// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  progress: { type: Map, of: Number }, // Track quiz scores or topic mastery
});

module.exports = mongoose.model('User', UserSchema);
