const mongoose = require('mongoose');

// Define the Group schema
const groupSchema = new mongoose.Schema({
  // Unique name of the group
  name: { type: String, required: true, unique: true },
  
  // Optional description of the group
  description: { type: String },
  
  // List of members in the group
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Array of queries posted in the group
  queries: [
    { 
      content: { type: String, required: true }, // Content of the query
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who posted the query
      createdAt: { type: Date, default: Date.now }, // Timestamp of when the query was created
      replies: [ // Replies to the query
        { 
          content: { type: String, required: true }, // Content of the reply
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who posted the reply
          createdAt: { type: Date, default: Date.now } // Timestamp of when the reply was created
        }
      ]
    }
  ],
  
  // Timestamp of when the group was created
  createdAt: { type: Date, default: Date.now },
});

// Create the Group model
const Group = mongoose.model('Group', groupSchema);

// Export the model
module.exports = Group;
