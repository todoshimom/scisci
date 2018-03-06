myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    let self = this;
    self.userObject = {};
    self.userLibrary = { list: [] };

    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    self.getuser = function () {
        console.log('UserService -- getuser');
        $http.get('/api/user').then(function (response) {
            if (response.data.username) {
                // user has a curret session on the server
                self.userObject.userName = response.data.username;
                console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
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

    self.logout = function () {
        console.log('UserService -- logout');
        $http.get('/api/user/logout').then(function (response) {
            console.log('UserService -- logout -- logged out');
            $location.path("/home");
        });
    }

    // This is for the manage users view
    self.getAllUsers = function () {// Start of getAllUsers function.
        $http.get('/api/user/all')
            .then(function (response) {
                console.log('Get response for all users: ', response.data);
                self.userLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response failed: ', error);
            });
    }; // End of getAllUsers function.

    self.getAllUsers();

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    self.addUser = function (newUser) {// Start of addUser function.
        $http.post('/api/user/register', newUser)
            .then(function (response) {
                console.log('Response from add new user: ', response);
                self.getAllUsers();
            })
            .catch(function (error) {
                console.log('Error on new user POST request: ', error);
            });
    }; // End of addUser function.

    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/



    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/



    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/



}]);
