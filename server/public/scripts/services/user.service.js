myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    let self = this;
    self.userObject = { list: [] };
    self.userLibrary = { list: [] };
    self.userTypes = { list: [] };

    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    // This is for the manage users view
    self.getAllUsers = function () {// Start of getAllUsers function.
        $http.get('/api/user/users')
            .then(function (response) {
                console.log('Get response for all users: ', response.data);
                self.userLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for all users failed: ', error);
            });
    }; // End of getAllUsers function.

    self.getAllUsers();

    self.getUserTypes = function () {// Start of getUserTypes function.
        $http.get('/api/user/types')
            .then(function (response) {
                console.log('Get response for user types: ', response.data);
                self.userTypes.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for user types failed: ', error);
            });
    }; // End of getUserTypes function.

    self.getUserTypes();

    self.sortUsers = function (sortMethod) {
        $http.get(`/api/user/sorting/${sortMethod}`)
            .then(function (response) {
                console.log('Get response for sort users: ', response.data);
                self.userLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for sort users failed: ', error);
            });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    self.addUser = function (newUser) {// Start of addUser function.

        console.log(newUser);

        $http.post('/api/user', newUser)
            .then(function (response) {
                console.log('Response from add new user: ', response);
                self.getAllUsers();
                alert(`The account for ${newUser.first_name} ${newUser.last_name} has been created.`)
            })
            .catch(function (error) {
                console.log('Error on new user POST request: ', error);
            });

    }; // End of addUser function.

    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/

    self.submitEdit = function (userEdit) {

        $http.put('/api/user', userEdit)
            .then(function (response) {
                console.log('Response from edit a user (PUT request): ', response);
                self.getAllUsers();
                alert(`The account has been edited.`)
            })
            .catch(function (error) {
                console.log('Error on edit user PUT request: ', error);
            });

    }

    self.resetPassword = function (id) {

        $http.put(`/api/user/resetPassword/${id}`)
            .then(function (response) {
                console.log('Response from reset Password PUT request: ', response);
                // self.getAllUsers();
                alert(`The password has been reset.`)
            })
            .catch(function (error) {
                console.log('Error on reset password PUT request: ', error);
            });

    }

    self.setNewPassword = function (newPass) {
        console.log('sending new password: ', newPass);

        $http.put(`/api/user/newPassword`, newPass)
            .then(function (response) {
                console.log('Response from set new Password PUT request: ', response);
                // self.getAllUsers();
                alert(`Your password has been updated!`)
                $location.path('/user');
            })
            .catch(function (error) {
                console.log('Error on set new password PUT request: ', error);
            });

    }


    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/

    self.deleteUser = function (userId) {    // Start of deleteUser function

        $http.delete(`/api/user/${userId}`)
            .then(function (response) {
                console.log('User successfully removed: ', response);
                self.getAllUsers();
                alert(`The account has been deleted.`)
            })
            .catch(function (error) {
                console.log('Error removing user: ', error);
            });

    }; // End of deleteUser function

    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/

    self.getuser = function () {
        console.log('UserService -- getuser');
        $http.get('/api/user').then(function (response) {
            if (response.data.username) {
                // user has a curret session on the server
                self.userObject.list = response.data;
                console.log('UserService -- getuser -- User Data: ', self.userObject);
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/home");
            }
        }, function (response) {
            console.log('UserService -- getuser -- failure: ', response);
            $location.path("/home");
        });
    }

    self.getuser()

    self.logout = function () {
        console.log('UserService -- logout');
        $http.get('/api/user/logout').then(function (response) {
            console.log('UserService -- logout -- logged out');
            $location.path("/home");
        });
    }

}]);
