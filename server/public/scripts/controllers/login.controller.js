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
                            UserService.onLoad();
                            UserService.userTypeHomePage(response.data);
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
            swal({
                title: 'Please Follow Instructions',
                text: `8-32 characters & Atleast one letter and number`,
                icon: "error",
            })
        }
        else if (newPass.password === newPass.retypePassword) {
            console.log('They are an exact match!');
            if (newPass.password.toLowerCase() == 'welcome1') {
                console.log('it is the default it is no good');
                swal({
                    title: 'You can\'t use the default password',
                    icon: "error",
                })
            }
            else {
                console.log('New password is good to go!');
                UserService.setNewPassword(newPass)
            }
        }
        else {
            swal({
                title: 'Please make sure that the passwords match',
                icon: "error",
            })
        }
    }

    self.cancelNewPassword = ()=> {
        self.passwordStatus = true;
        self.user = null; //clearing input fields after canceling change password.
    }

}]);
