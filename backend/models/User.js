const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  progress: { type: Map, of: Number,  default: {}  }, // Track quiz scores or topic mastery
  assignments: {
    type: Map,
    of: Boolean, // assuming completed assignments will be true or false
  },
});
module.exports = mongoose.model('User', UserSchema);
