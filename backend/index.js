
require('dotenv').config(); // must come at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');  // Import groupRoutes

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3002', // Allow requests from the frontend
    methods: ['GET', 'POST'],
  },
});

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:3002', // Allow requests from the frontend
}));

app.use(express.json());

// API routes
app.use('/api', quizRoutes);
app.use('/api', authRoutes);
app.use('/api/groups', groupRoutes);  // Add group routes

// Socket.io handling
io.on('connection', (socket) => {
  console.log('New connection');

  // Handle connection error
  socket.on('connect_error', (err) => {
    console.error('Connection Error:', err);
  });

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});




// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  tlsAllowInvalidCertificates: true, // optional for dev
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


// Start server on port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
