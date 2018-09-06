$(function () {
    var socket = io();
    $('form').submit(function () {
        if ($.trim($('#message').val())) {
            socket.emit('message', $('#message').val());
            $('#message').val('');
            return false;
        } else {
            console.log("Attempted to send an empty message. Request was ignored.");
            $('#message').val('');
            return false;
        }
    });
    socket.on('message', function (msg) {
        var list = $('#messages');
        list.append($('<li>').text(msg));
        $('div').animate({
            scrollTop: $("#messages li").last().offset().top
        }, 'fast');
    });
});
