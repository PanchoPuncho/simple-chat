var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io');
var ioServer = io(server);

app.use(express.static('src'));

ioServer.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('message', function (msg) {
        console.log('message: ' + msg);
        socket.broadcast.emit('message', msg);
    });
    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });
});

server.listen(3000, function () {
    console.log('listening on *:3000');
});
