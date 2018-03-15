myApp.controller('NavController', ['$location', 'UserService', function ($location, UserService) {
    console.log('NavController created');
    let self = this;
    self.userService = UserService;
    
    var usertypeValue = self.userService.userObject.list.usertype;

    // find the location path and it matches the current item
    // add the class 'active' to the element, otherwise no class
    self.getClass = function(pathName) {
        if($location.path() === pathName) {
            return 'active';
        } else {
            return '';
        }
    }

    // return values to variables based on user type
    self.showNav = function() {
        console.log('usertypevalue', usertypeValue);
    
        if(usertypeValue === 1) {
            self.showManageUsers = true;
            self.showModuleCreation = true;
            self.showShopping = true;
            self.showReporting = true;
            self.showAppSettings = true;
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


    // tooltip controls
    self.docTooltip = {
        showTooltip: false,
        tipDirection: "right"
    };
    // end tooltip controls
}]);
