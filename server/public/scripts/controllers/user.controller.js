myApp.controller('UserController', ['UserService', function (UserService) {
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.userLibrary = UserService.userLibrary;
    self.userTypes = UserService.userTypes;
    self.currentLaborRate = UserService.currentLaborRate

    self.addUser = function (newUser) {    // Start of addUser function
        if (newUser.first_name == '' || newUser.last_name == '' || newUser.username == '' || typeof newUser.first_name == 'undefined' || typeof newUser.last_name == 'undefined' || typeof newUser.username == 'undefined') {
            swal({
                title: 'Please fill out First Name, Last Name and Username',
                text: `Default Account-Type is Editor if none is picked`,
                icon: "error",
            })
        }
        else {
            swal({
                title: `Are you sure you want to add the account`,
                text: `${newUser.first_name} ${newUser.last_name}`,
                icon: "warning",
                dangerMode: 'Yes',
                buttons: ["No", "Yes"],
            })
                .then(value => { // Sweet Alerts confirmation if user wants to add an account. 
                    if (value) { // To make sure that the user wants to add an account. 
                        if (newUser.usertype == '' || typeof newUser.usertype == 'undefined') {
                            newUser.usertype = 2 //Default is editor if none is given. 
                        }
                        UserService.addUser(newUser);

                        self.showNew = !self.showNew

                        self.newUser = null; //clearing input fields after adding a user. 
                    }
                })
        }
    }; // End of addUser function

    self.deleteUser = function (user) {    // Start of deleteUser function
        if (self.userObject.list.id == user.id) { //If they deleted the ng-disabled on the html page. This tells them they cannot delete themselves.
            swal({
                title: 'You cannot delete your own account',
                icon: "error",
            })
        }
        else {
            swal({
                title: `Are you sure you want to delete the account`,
                text: `${user.first_name} ${user.last_name}`,
                icon: "warning",
                dangerMode: 'Yes',
                buttons: ["No", "Yes"],
            })
                .then(value => { //Sweet Alerts confirmation if user wants to delete the accounts. 
                    if (value) { //To make sure that the user wants to delete the account. 
                        UserService.deleteUser(user.id);
                    }
                })

        }
    }; // End of deleteUser function

    self.submitEdit = function (userEdit) {    // Start of submitEdit function
        if (userEdit.first_name == '' || userEdit.last_name == '' || userEdit.username == '' || typeof userEdit.first_name == 'undefined' || typeof userEdit.last_name == 'undefined' || typeof userEdit.username == 'undefined') {
            swal({
                title: 'First Name / Last Name / Username cannot be blank.',
                icon: "error",
            })
        }
        else {
            UserService.submitEdit(userEdit);

            self.showEdit = !self.showEdit

            self.userEdit = null; // clearing input fields after editing a user.     
        }
    }    // End of submitEdit function

    self.resetPassword = function (id) {  // Start of resetPassword function    
        swal({
            title: `Are you sure you want to reset this accounts password?`,
            icon: "warning",
            dangerMode: 'Yes',
            buttons: ["No", "Yes"],
        })
            .then(value => { //Sweet Alerts confirmation if user wants to reset the accounts password. 
                if (value) { //To make sure that the user wants to reset the account password. 
                    UserService.resetPassword(id);
                }
            })
    }// End of resetPassword function    

    self.sortUsers = function (sortMethod) {// Start of Sort Users function
        UserService.sortUsers(sortMethod);
    }// End of Sort Users function


    self.setLaborRate = function (rate) {
        UserService.setLaborRate(rate)
    }

}]);    
