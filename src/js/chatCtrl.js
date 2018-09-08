angular.module('myApp', []).controller('chatCtrl', function ($scope) {
    // Contains all data pertinent to the application
    $scope.data = {
        username: "",
        msg: "",
        messages: [],
        users: [
            "bob",
            "the",
            "builder"
        ],
        welcome: ""
    };

    /**
     * Validate that a username is provided before granting access to the chat.
     */
    $scope.validateLogin = function () {
        if ($scope.data.username && $scope.data.username.trim() !== "") {
            angular.element('#loginModal').modal('hide');
            $scope.data.welcome = "Welcome, " + $scope.data.username + "!";
        } else {
            $('#username').val('');
        }
    };

    /**
     * Display the login modal on startup.
     */
    angular.element('#loginModal').modal('show');
});