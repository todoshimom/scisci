myApp.controller('UserController', ['UserService', function (UserService) {
    console.log('UserController created');
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.userLibrary = UserService.userLibrary;
    self.userTypes = UserService.userTypes;

    self.addUser = function (newUser) {    // Start of addUser function
        if (confirm(`Are you sure you want to add an account for ${newUser.first_name} ${newUser.last_name}?`)) {
            UserService.addUser(newUser);
        }
    }; // End of addUser function

    self.deleteUser = function(user) {    // Start of deleteUser function
        if (confirm(`Are you sure you want to delete the account of ${user.first_name} ${user.last_name}?`)) {
            UserService.deleteUser(user.id);
        }
      }; // End of deleteUser function
}]);
