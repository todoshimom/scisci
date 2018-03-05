let myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    console.log('myApp -- config')
    $routeProvider
        .when('/', {
            redirectTo: 'home'
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'LoginController as vm'
        })
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'LoginController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/user', {
            templateUrl: '/views/templates/user.html',
            controller: 'UserController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/component', {
            templateUrl: '/views/templates/component.html',
            controller: 'ComponentController as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .otherwise({
            template: '<h1>404</h1>'
        });
}]);
