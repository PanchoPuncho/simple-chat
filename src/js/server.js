const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io');
const ioServer = io(server);
const User = require('./User');

/**
 * Configure socketio-auth
 */
require('socketio-auth')(ioServer, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
    disconnect: disconnect,
    timeout: 1000
});

/**
 *  Connect to the Database
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongoOpts = {
    useNewUrlParser: true
};
const mongoUrl = 'mongodb://localhost/simple-chat';
ioServer.use((socket, next) => {
    mongoose
        .connect(mongoUrl, mongoOpts)
        .then(() => next())
        .catch(e => console.error(e.stack));
});

/**
 * Start the server.
 */
app.use(express.static('src'));
server.listen(3000, function () {
    console.log('listening on *:3000');
});

/**
 * Authenticate a client's connection request.
 * If a login is requested, confirm the username and password.
 * If a registration is requested, add the new user.
 * @param {*} socket 
 * @param {*} data 
 * @param {*} callback 
 */
function authenticate(socket, data, callback) {
    const {
        username,
        password,
        register
    } = data;
    try {
        if (register) {
            User.create({
                username: username,
                password: password
            }).then(function (user) {
                callback(null, !!user);
            });
        } else {
            User.findOne({
                username: username
            }).then(function (user) {
                if (user) {
                    // User exists. Validate password
                    callback(null, user && user.validPassword(password));
                } else {
                    // User does not exist
                    callback(null, false);
                }
            });
        }
    } catch (error) {
        callback(error);
    }
}

/**
 * After a client has been authenticated, notify all users and
 * grant the client access to the chat.
 * @param {*} socket 
 * @param {*} data 
 */
function postAuthenticate(socket, data) {
    User.findOne({
        username: data.username
    }).then(function (user) {
        socket.client.user = user;
        toggleUserState(user.username, true);
        sendServerMessage(user.username + ' connected');
    });

    /**
     * When receiving a message from a client, share the message
     * with all other clients.
     */
    socket.on('message', function (msg) {
        socket.broadcast.emit('message', {
            username: socket.client.user.username,
            message: msg
        });
    });
}

/**
 * Disconnect a client. Notify all users if client was authenticated.
 * @param {*} socket 
 */
function disconnect(socket) {
    if (socket.client.user !== undefined) {
        toggleUserState(socket.client.user.username, false);
        sendServerMessage(socket.client.user.username + ' disconnected');
    }
}

/**
 * Toggle user state. Used to activate/deactivate user.
 * Once the user state is updates, sends the list of active
 * users to all clients.
 */
function toggleUserState(username, state) {
    User.findOneAndUpdate({
        username: username
    }, {
        $set: {
            active: state
        }
    }).then(function (user) {
        sendActiveUsers();
    });
}

/**
 * Send the list of active users to all clients.
 * TODO - refactor for scalability.
 */
function sendActiveUsers() {
    User.find({
        active: true
    }, {
        _id: 0,
        username: 1
    }).sort({
        username: 1
    }).then(function (users) {
        ioServer.emit('users', users);
    });
}

/**
 * Send a server message to all clients.
 */
function sendServerMessage(msg) {
    ioServer.emit('server-message', msg);
}
