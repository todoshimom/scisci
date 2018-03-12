myApp.controller('NavController', ['$location', 'UserService', function ($location, UserService) {
    console.log('NavController created');
    let self = this;
    self.userService = UserService;

    self.showManageUsers = false;
    self.showModuleCreation = false;
    self.showShopping = false;
    self.showReporting = false;
    self.showAppSettings = false;

    // find the location path and it matches the current item
    // add the class 'active' to the element, otherwise no class
    self.getClass = function(pathName) {
        if($location.path().substr(0, pathName.length) === pathName) {
            return 'active';
        } else {
            return '';
        }
    }

    // return values to variables based on user type
    self.showNav = function() {
        var usertypeValue = self.userService.userObject.list.usertype;
        console.log('usertypevalue', usertypeValue);
    
        if(usertypeValue === 1) {
            self.showManageUsers = true;
        }
        if(usertypeValue === 2) {
            self.showModuleCreation = true;
            self.showShopping = true;
            self.showReporting = true;
            self.showAppSettings = true;
        }
        if(usertypeValue === 3) {
            self.showShopping = true;
        }
    }

    self.showNav();
}]);
