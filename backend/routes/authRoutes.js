const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send('Token is required.');

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token.');
    req.userId = decoded.id; // Save user ID for the next middleware
    next();
  });
};

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Account does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


// Save User Progress
router.post('/saveProgress', verifyToken, async (req, res) => {
  const { topic, score } = req.body;
  console.log('Received topic:', topic, 'Score:', score);

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Initialize user.progress if it doesn't exist
    if (!user.progress) {
      user.progress = new Map();
    }

    user.progress.set(topic, score); 
user.markModified('progress'); // Ensure Mongoose tracks the change in Map

    await user.save();
    console.log('Progress saved for topic:', topic, 'Score:', score);
    res.json({ message: 'Progress saved successfully!' });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Error saving progress', error });
  }
});


// Get User Progress
router.get('/getProgress', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('progress assignments');
    res.json({
      quizzes: user.progress || {},  // Ensure quizzes are returned
      assignments: user.assignments || {} // Ensure assignments are returned
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error });
  }
});

// Save User Assignment Progress
router.post('/saveAssignmentProgress', verifyToken, async (req, res) => {
  const { topic } = req.body; // Only topic needed for marking as complete

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Initialize assignments if it doesn't exist
    if (!user.assignments) {
      user.assignments = new Map();
    }

    user.assignments.set(topic, true);
    user.markModified('assignments');

    await user.save();
    res.json({ message: 'Assignment progress saved successfully!' });
  } catch (error) {
    console.error('Error saving assignment progress:', error);
    res.status(500).json({ message: 'Error saving assignment progress', error });
  }
});

// Get User Assignment Progress
router.get('/getAssignmentProgress', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('assignments');
    res.json(user.assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment progress', error });
  }
});


// Get User Profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name email'); // Adjust fields as necessary
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

module.exports = router;
