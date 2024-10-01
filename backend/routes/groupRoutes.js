// backend/routes/groupRoutes.js

const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const authMiddleware = require('../routes/auth'); // Ensure user authentication

// Create a new group
router.post('/create', authMiddleware, async (req, res) => {
  const { name, description } = req.body;
  try {
    const group = new Group({ name, description });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: 'Group creation failed' });
  }
});

// Join a group
router.post('/:groupId/join', authMiddleware, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id; // Extract user ID from the request
  
    try {
      // Check if the group exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Check if the user is already a member of the group
      if (group.members.includes(userId)) {
        return res.status(400).json({ error: 'Already a member of this group' });
      }
  
      // Add user to the group members
      group.members.push(userId);
      await group.save();
  
      // Return the updated group information
      res.status(200).json({ message: 'Joined group successfully', group });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: 'Error joining group' });
    }
  });
  

// Get the groups the user has joined
router.get('/joined', authMiddleware, async (req, res) => {
    try {
      const groups = await Group.find({ members: req.user.id });
      res.json(groups);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching joined groups' });
    }
});

// Leave a group
router.post('/:groupId/leave', authMiddleware, async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    group.members = group.members.filter(member => member.toString() !== req.user.id);
    await group.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: 'Error leaving group' });
  }
});

// Get all groups
router.get('/', async (req, res) => {
    try {
      const groups = await Group.find();
      res.json(groups);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching groups' });
    }
  });
  
  // Existing routes for join, leave, and fetching joined groups
  
  // post query
router.post('/:groupId/queries', authMiddleware, async (req, res) => {
    const { groupId } = req.params;
    const { content } = req.body; // assuming content is the question text
  
    try {
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ error: 'Group not found' });
  
      const newQuery = {
        content,
        user: req.user.id,
        createdAt: new Date(),
      };
  
      group.queries.push(newQuery); // assuming 'queries' is an array in the Group model
      await group.save();
      res.status(201).json(newQuery);
    } catch (err) {
      res.status(500).json({ error: 'Error posting query' });
    }
  });

  // Get queries for a specific group
router.get('/:groupId/queries', async (req, res) => {
    try {
      const group = await Group.findById(req.params.groupId).populate('queries.user', 'name'); // Ensure user details are populated
      if (!group) return res.status(404).json({ error: 'Group not found' });
      res.json(group.queries); // Send queries back to the client
    } catch (error) {
      console.error('Error fetching queries', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  

module.exports = router;
