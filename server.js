// Import packages
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create express app
const app = express();

// Create HTTP server (خیلی مهم)
const server = http.createServer(app);

// Create socket server
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

// Socket connection
io.on('connection', (socket) => {

  console.log('User connected:', socket.id);

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server (دقت کن server نه app)
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
