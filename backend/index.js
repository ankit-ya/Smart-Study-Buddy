const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();

// Create HTTP server and Socket.io server
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', quizRoutes);
app.use('/api', authRoutes); // Add this line to include auth routes

// Socket.io handling
io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smart-study-buddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
server.listen(5000, () => {
  console.log('Server running on port 5000');
});
