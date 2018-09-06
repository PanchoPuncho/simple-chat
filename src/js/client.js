$(function () {
    var socket = io();
    $('form').submit(function() {
        socket.emit('message', $('#message').val());
        $('#message').val('');
        return false;
    });
    socket.on('message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
});
