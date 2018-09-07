/**
 * Client driver.
 */
$(function () {
    var socket = io();
    var list = $('#messages');
    var msg = $('#msg');
    $('form').submit(function () {
        if ($.trim(msg.val())) {
            // Send message to the server
            socket.emit('message', msg.val());
            // Append message to the screen
            appendSentMessage(msg.val());
            // Clear message
            msg.val('');
            return true;
        } else {
            console.log("Attempted to send an empty message. Request was ignored.");
            // Clear message
            msg.val('');
            return false;
        }
    });
    socket.on('message', function (msg) {
        appendReceivedMessage(msg);
    });
});

/**
 * Appends a sent message to the screen.
 * @param {*} msg 
 */
function appendSentMessage(msg) {
    var list = $('#messages');
    list.append('<div class="row"><li class="list-group-item list-group-item-info col-sm-6 col-sm-offset-6 text-right primary">' + msg + '</li></div>');
    scrollToBottom();
};

/**
 * Appends a received message to the screen.
 * @param {*} msg 
 */
function appendReceivedMessage(msg) {
    var list = $('#messages');
    list.append('<div class="row"><li class="list-group-item list-group-item-success col-sm-6 primary">' + msg + '</li></div>');
    scrollToBottom();
};

/**
 * Scroll to the bottom of the messages (latest).
 */
function scrollToBottom() {
    $('div').animate({
        scrollTop: $("#messages li").last().offset().top
    }, 'fast');
}