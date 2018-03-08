myApp.controller('LoginController', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('LoginController created');
    let self = this;
    self.user = {
        username: '',
        password: ''
    };
    self.newPassword = {}
    self.message = '';

    self.passwordStatus = true;

    self.login = function () {
        if (self.user.username === '' || self.user.password === '') {
            self.message = "Enter your username and password!";
        } else {
            console.log('sending to server...', self.user);
            $http.post('/api/user/login', self.user).then(
                function (response) {
                    if (response.status == 200) {
                        console.log('success: ', response.data);
                        // location works with SPA (ng-route)
                        if (self.user.password.toLowerCase() == 'welcome1') {
                            self.passwordStatus = false;
                        }
                        else {
                            $location.path('/user');
                        }
                    } else {
                        console.log('failure error: ', response);
                        self.message = "Incorrect credentials. Please try again.";
                    }
                },
                function (response) {
                    console.log('failure error: ', response);
                    self.message = "Incorrect credentials. Please try again.";
                });
        }
    };

    self.setNewPassword = function (newPass) {
        console.log(newPass);

        if (typeof newPass.password == 'undefined' || typeof newPass.retypePassword == 'undefined') {
            alert('"Please follow instructions of atleast 8-32 characters and atleast one letter and number!"')
        }
        else if (newPass.password === newPass.retypePassword) {
            console.log('They are an exact match!');
            if (newPass.password.toLowerCase() == 'welcome1') {
                console.log('it is the default it is no good');
                alert('You can\'t use the default password as your new password, please choose something else. ')
            }
            else {
                console.log('New password is good to go!');
                UserService.setNewPassword(newPass)
            }
        }
        else {
            alert('Please make sure that both password fields match eachother.')
        }
    }

    self.cancelNewPassword = ()=> {
        self.passwordStatus = true;
        self.user = null; //clearing input fields after canceling change password.  
    }
}]);
