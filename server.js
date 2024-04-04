// import the express package 
const express = require('express');
const app = express();
// const cors = require('cors');

// app.use(cors());

// start the server on port 3000
const server = app.listen(3000, function() { 
    console.log('http://localhost:3000') 
})

// tell the server to use this subfolder to serve web pages
app.use(express.static('public/client'));

// import the socket package too
const socket = require('socket.io')

// create the socket manager
const io = socket(server)

// handle event
io.sockets.on('connection', function (socket) {
    console.log(`connect ${socket.id}`)

    socket.on('tap', function(data) {
        socket.broadcast.emit('tap', data)
        console.log(`tap, ${data.x}, ${data.y}`)
    })

    socket.on('swipe', function(data) {
        socket.broadcast.emit('swipe', data)
        console.log(`swipe, ${data.x}, ${data.y}`)
    })

    socket.on('longTap', function(data) {
        socket.broadcast.emit('longTap', data)
        console.log(`longTap, ${data.x}, ${data.y}`)
    })
})