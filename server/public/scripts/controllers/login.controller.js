myApp.controller('LoginController', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
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
            $http.post('/api/user/login', self.user).then(
                function (response) {
                    if (response.status == 200) {
                        // location works with SPA (ng-route)
                        if (self.user.password.toLowerCase() == 'welcome1') {
                            self.passwordStatus = false;
                        }
                        else {
                            console.log(self.user);
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
        if (typeof newPass.password == 'undefined' || typeof newPass.retypePassword == 'undefined') {
            swal({
                title: 'Please Follow Instructions',
                text: `8-32 characters & Atleast one letter and number`,
                icon: "error",
            })
        }
        else if (newPass.password === newPass.retypePassword) {
            if (newPass.password.toLowerCase() == 'welcome1') {
                swal({
                    title: 'You can\'t use the default password',
                    icon: "error",
                })
            }
            else {
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
        self.user = null;
    }

}]);
