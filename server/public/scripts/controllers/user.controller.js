myApp.controller('UserController', ['UserService', function (UserService) {
    console.log('UserController created');
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.userLibrary = UserService.userLibrary;
    self.userTypes = UserService.userTypes;

    self.addUser = function (newUser) {    // Start of addUser function
        console.log(newUser);
        if (newUser.first_name == '' || newUser.last_name == '' || newUser.username == '' || typeof newUser.first_name == 'undefined' || typeof newUser.last_name == 'undefined' || typeof newUser.username == 'undefined') {
            alert('Please fill out First Name, Last Name and Username. "Note: Default Account-Type is Editor if none is picked"')
        }
        else if (confirm(`Are you sure you want to add an account for ${newUser.first_name} ${newUser.last_name}?`)) {
            console.log(newUser.user_type);// undefined if none.
            if (newUser.user_type == '' || typeof newUser.user_type == 'undefined') {
                newUser.user_type = 2 //Default is editor if none is given. 
            }
            console.log(newUser.user_type);// now has the property.

            UserService.addUser(newUser);

            self.showNew = !self.showNew

            self.newUser = null; //clearing input fields after adding a user. 
        }
    }; // End of addUser function

    self.deleteUser = function (user) {    // Start of deleteUser function
        if (self.userObject.list.id == user.id) { //If they deleted the ng-disabled on the html page. This tells them they cannot delete themselves.
            alert('You cannot delete your own account!')
        }
        else if (confirm(`Are you sure you want to delete the account of ${user.first_name} ${user.last_name}?`)) {
            UserService.deleteUser(user.id);
        }
    }; // End of deleteUser function

    self.submitEdit = function (userEdit) {    // Start of submitEdit function
        if (userEdit.first_name == '' || userEdit.last_name == '' || userEdit.username == '' || typeof userEdit.first_name == 'undefined' || typeof userEdit.last_name == 'undefined' || typeof userEdit.username == 'undefined') {
            alert('First Name / Last Name / Username cannot be blank.')
        }
        else {
            UserService.submitEdit(userEdit);

            self.showEdit = !self.showEdit

            self.userEdit = null; //clearing input fields after editing a user.     
        }
    }    // End of submitEdit function

    self.resetPassword = function (id) {  // Start of resetPassword function    
        if (confirm(`Are you sure you want to reset this accounts password?`)) {
            UserService.resetPassword(id);
        }
    }// End of resetPassword function    

    self.sortUsers = function (sortMethod) {// Start of Sort Users function
        UserService.sortUsers(sortMethod);
    }// End of Sort Users function


    self.setLaborRate = function (rate) {
        UserService.setLaborRate(rate)
    }

}]);    
