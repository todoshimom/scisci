myApp.controller('UserController', ['UserService', function (UserService) {
    console.log('UserController created');
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
}]);
