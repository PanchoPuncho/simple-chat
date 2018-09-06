$(function () {
    var socket = io();
    $('form').submit(function() {
        socket.emit('message', $('#message').val());
        $('#message').val('');
        return false;
    });
    socket.on('message', function(msg) {
        var list = $('#messages');
        list.append($('<li>').text(msg));
        $('div').animate({
            scrollTop: $("#messages li").last().offset().top
        }, 'fast');
    });
});
