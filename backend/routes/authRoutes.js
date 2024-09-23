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
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the new user
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
    console.log('Logging in user with email:', email); // Debug log
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Account does not exist' });

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create and return a token
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Debug log
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Get User Profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

module.exports = router;
