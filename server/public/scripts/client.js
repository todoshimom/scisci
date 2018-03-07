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
        .when('/app-settings', {
            templateUrl: '/views/templates/app-settings.html',
            controller: 'UserController as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/module-nav', {
            templateUrl: '/views/templates/module-nav.html'
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
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
        .when('/module', {
            templateUrl: '/views/templates/module.html',
            controller: 'ModuleController as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/module-list', {
            templateUrl: '/views/templates/module-list.html',
            controller: 'ModuleListController as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/report', {
            templateUrl: '/views/templates/report.html',
            controller: 'ReportController as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/shopping-nav', {
            templateUrl: '/views/templates/shopping-nav.html'
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/shopping-list', {
            templateUrl: '/views/templates/shopping-list.html',
            controller: 'ShoppingListController as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/shopping-list-creation', {
            templateUrl: '/views/templates/shopping-list-creation.html',
            controller: 'ShoppingListCreationService as vm',
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .otherwise({
            templateUrl: '/views/templates/404.html'
        });
}]);
