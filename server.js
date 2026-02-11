const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static)('public');

//when client connects
io.on('connection', (socket) => {

    console.log('User connected :', socket.id);

    // when client send message
    socket.on('chatMessage', (msg) => {
        
        console.log('Message: ', msg);

        // send the message to all Users
        io.emit('chatMessage', msg);
    })
});

// when Users disconnects
socket.on('disconnect', () => {
    console.log('User disconnected : ', socket.id);
});

server.listen(3000 , () => {
    console.log('Server running on http://localhost:3000');
})