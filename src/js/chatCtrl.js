angular.module('myApp', []).controller('chatCtrl', function ($scope) {
    // Contains all data pertinent to the app
    $scope.data = {
        msg: '',
        messages: [],
        users: []
    };

    // Contains all data pertinent to the login
    $scope.login = {
        register: false,
        username: '',
        password: '',
        passwordConfirmation: '',
        warning: ''
    };

    // Active User
    $scope.user = {
        username: '',
        password: ''
    };

    /**
     * Display the login modal on startup.
     */
    angular.element('#loginModal').modal('show');

    /**
     * Validate the login fields before attempting to validate with server.
     * Handles registration attempts as well for code reuse.
     */
    $scope.validateLogin = function () {
        if ($scope.login.username && $scope.login.username.trim() !== '') {
            if ($scope.login.password && $scope.login.password.trim() !== '') {
                if (!$scope.login.register) {
                    // Login
                    connect();
                } else {
                    // Register
                    if ($scope.login.passwordConfirmation && $scope.login.passwordConfirmation.trim() !== '' &&
                        $scope.login.password === $scope.login.passwordConfirmation) {
                        connect();
                    } else {
                        $scope.login.warning = 'Passwords Did Not Match';
                        // Clear out values if invalid password combo
                        $('#login-password').val('');
                        $('#login-password-confirmation').val('');
                    }
                }
            } else {
                $scope.login.warning = 'Invalid Password';
                // Clear out invalid password
                $('#login-password').val('');
            }
        } else {
            $scope.login.warning = 'Invalid Username';
            // Clear out invalid username
            $('#login-username').val('');
        }
    };

    /**
     * Connect to the server and handle all possible interactions.
     * Attempts to authenticate and disconnects any failed clients.
     */
    function connect() {
        var socket = io();
        var list = $('#messages');
        var msg = $('#msg');

        socket.on('connect', function () {
            /**
             * Attempt authentication
             */
            socket.emit('authentication', {
                username: $scope.login.username,
                password: $scope.login.password,
                register: $scope.login.register
            });

            /**
             * Failed authentication
             */
            socket.on('unauthorized', function (err) {
                $('#login-password').val('');
                $scope.login.warning = err.message;
                $scope.$apply();
            });

            /**
             * Authenticated
             */
            socket.on('authenticated', function () {
                // Hide the login modal
                angular.element('#loginModal').modal('hide');

                // Assign the active user
                $scope.user = {
                    username: $scope.login.username,
                    password: $scope.login.password
                };

                // Populate the list of users
                socket.on('users', function (users) {
                    $scope.data.users = users;
                    $scope.$apply();
                });

                // Append received user messages
                socket.on('message', function (msg) {
                    appendReceivedMessage(msg);
                });

                // Append received server messages
                socket.on('server-message', function (msg) {
                    appendServerMessage(msg);
                });

                /**
                 *  Send a new message
                 */
                $('form').submit(function () {
                    if ($.trim(msg.val())) {
                        socket.emit('message', msg.val());
                        appendSentMessage(msg.val());
                        // Clear message field
                        msg.val('');
                        return false;
                    } else {
                        // Clear message field
                        msg.val('');
                        return false;
                    }
                });
            });
        });
    }

    /**
     * Appends a sent message to the screen.
     * @param {*} msg 
     */
    function appendSentMessage(msg) {
        var list = $('#messages');
        list.append('<div class="row"><li class="list-group-item list-group-item-danger col-sm-6 col-sm-offset-6 text-right primary">' + msg + '</li></div>');
        scrollToBottom();
    }

    /**
     * Appends a received message to the screen.
     * @param {*} msg 
     */
    function appendReceivedMessage(msg) {
        var list = $('#messages');
        list.append('<div class="row"><li class="list-group-item list-group-item-primary col-sm-6 primary">' + msg + '</li></div>');
        scrollToBottom();
    }

    /**
     * Appends a server message to the screen.
     * @param {*} msg 
     */
    function appendServerMessage(msg) {
        var list = $('#messages');
        list.append('<div class="row"><li class="list-group-item list-group-item-warning col-sm-6 col-sm-offset-3 text-center primary">' + msg + '</li></div>');
        scrollToBottom();
    }

    /**
     * Scroll to the bottom of the messages (latest).
     */
    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
});
