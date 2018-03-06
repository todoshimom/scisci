myApp.controller('UserController', ['UserService', function (UserService) {
    console.log('UserController created');
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.userLibrary = UserService.userLibrary;

    self.addUser = function (newUser) {    // Start of addUser function
        UserService.addUser(newUser);
    }; // End of addUser function
}]);
