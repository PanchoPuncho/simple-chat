const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io');
const ioServer = io(server);
const auth = require('socketio-auth')(ioServer, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
    disconnect: disconnect,
    timeout: 1000
});

/**
 * List of server users. TODO - move to a database.
 */
var users = [{
        username: "Andy",
        password: "pass"
    },
    {
        username: "Bob",
        password: "pass"
    }
];

/**
 * Start the server.
 */
app.use(express.static('src'));
server.listen(3000, function () {
    console.log('listening on *:3000');
});

/**
 * Authenticate a client's connection request.
 * @param {*} socket 
 * @param {*} data 
 * @param {*} callback 
 */
function authenticate(socket, data, callback) {
    var existingUser = findUser(data.username);
    if (existingUser) {
        callback(null, existingUser.password === data.password);
    } else {
        console.log(data.username + " not found");
        callback(new Error('User not found'));
    }
}

/**
 * After a client has been authenticated, notify all users and
 * grant the client access to the chat.
 * @param {*} socket 
 * @param {*} data 
 */
function postAuthenticate(socket, data) {
    var existingUser = findUser(data.username);
    socket.client.user = existingUser;
    ioServer.emit('server-message', socket.client.user.username + ' connected');
    ioServer.emit('users', users);

    socket.on('register', function (user) {
        console.log('Users: ' + users);
        console.log(user.name + ' attempted to register');
        if (!userExists(user)) {
            users = users.concat(user);
        }
        ioServer.emit('users', users);
    });

    socket.on('message', function (msg) {
        console.log(socket.client.user.username + ': ' + msg);
        socket.broadcast.emit('message', msg);
    });
}

/**
 * Disconnect a client. Notify all users if client was authenticated.
 * @param {*} socket 
 */
function disconnect(socket) {
    if (socket.client.user !== undefined) {
        ioServer.emit('server-message', socket.client.user.username + ' disconnected');
    }
}

/**
 * Checks if provided user exists.
 * @param {*} user 
 */
function findUser(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
    return null;
}
