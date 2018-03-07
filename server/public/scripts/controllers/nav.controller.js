myApp.controller('NavController', ['$location', function ($location) {
    console.log('NavController created');
    let self = this;

    // find the location path and it matches the current item
    // add the class 'active' to the element, otherwise no class
    self.getClass = function(pathName) {
        if($location.path().substr(0, pathName.length) === pathName) {
            return 'active';
        } else {
            return '';
        }
    }

    self.logout = function () {
        console.log('navController -- logout');
        $http.get('/api/user/logout').then(function (response) {
            console.log('navController -- logout -- logged out');
            $location.path("/home");
        });
    }

}]);
