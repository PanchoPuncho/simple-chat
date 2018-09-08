angular.module('myApp', []).controller('chatCtrl', function ($scope) {
    // Contains all data pertinent to the user
    $scope.data = {
        username: "",
        msg: "",
        messages: [],
        users: [
            "bob",
            "the",
            "builder"
        ]
    };

    // Contains all data pertinent to the login
    $scope.login = {
        register: false,
        username: "",
        password: "",
        passwordConfirmation: ""
    };

    /**
     * Validate the login/registration attempt before granting access to the chat.
     */
    $scope.validateLogin = function () {
        if ($scope.login.username && $scope.login.username.trim() !== "") {
            if ($scope.login.password && $scope.login.password.trim() !== "") {
                if (!$scope.login.register) {
                    // Sign In
                    angular.element('#loginModal').modal('hide');
                    $scope.data.username = $scope.login.username;
                } else {
                    // Register
                    if ($scope.login.passwordConfirmation &&
                        $scope.login.passwordConfirmation.trim() !== "" &&
                        $scope.login.password === $scope.login.passwordConfirmation) {
                        angular.element('#loginModal').modal('hide');
                    } else {
                        // Clear out values if invalid password combo
                        $('#login-password').val('');
                        $('#login-password-confirmation').val('');
                    }
                }
            } else {
                // Clear out invalid password
                $('#login-password').val('');
            }
        } else {
            // Clear out invalid username
            $('#login-username').val('');
        }
    };

    /**
     * Display the login modal on startup.
     */
    angular.element('#loginModal').modal('show');
});
