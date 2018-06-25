let myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'chart.js', 'ngAnimate', 'sticky']);

myApp.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#f59132', '#55ac56', '#006699'],
        responsive: true
    });
}]);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
        .when('/', {
            redirectTo: 'home'
        })
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'LoginController as vm',
        })
        .when('/user', {
            templateUrl: '/views/templates/user.html',
            controller: 'UserController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3, 2);
                }
            }
        })
        .when('/app-settings', {
            templateUrl: '/views/templates/app-settings.html',
            controller: 'UserController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/module-nav', {
            templateUrl: '/views/templates/module-nav.html',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/component', {
            templateUrl: '/views/templates/component.html',
            controller: 'ComponentController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/module', {
            templateUrl: '/views/templates/module-new.html',
            controller: 'ModuleNewController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/module/:id', {
            templateUrl: '/views/templates/module.html',
            controller: 'ModuleController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/module-library', {
            templateUrl: '/views/templates/module-library.html',
            controller: 'ModuleListController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/report', {
            templateUrl: '/views/templates/report.html',
            controller: 'ReportController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(true, 3);
                }
            }
        })
        .when('/shopping-nav', {
            templateUrl: '/views/templates/shopping-nav.html',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(false);
                }
            }
        })
        .when('/shopping-list', {
            templateUrl: '/views/templates/shopping-list.html',
            controller: 'ShoppingListController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(false);
                }
            }
        })
        .when('/shopping-list/:id', {
            templateUrl: '/views/templates/shopping-list.html',
            controller: 'ShoppingListController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(false);
                }
            }
        })
        .when('/shopping-list-creation', {
            templateUrl: '/views/templates/shopping-list-creation.html',
            controller: 'ShoppingListCreationController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser(false);
                }
            }
        })
        .otherwise({
            templateUrl: '/views/templates/404.html'
        });

    var orangeMap = $mdThemingProvider.extendPalette('orange', {
        '500': '#f59132',
        'contrastDefaultColor': 'dark'
    });
    var greenMap = $mdThemingProvider.extendPalette('green', {
        '500': '55ac56',
        'contrastDefaultColor': 'dark'
    });

    $mdThemingProvider.definePalette('orange', orangeMap);

    $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('green');

}]);

myApp.directive("autoGrow", function(){
    return function(scope, element, attr){
        var update = function(){
            element.css("height", "auto");
            var height = element[0].scrollHeight;
            if(height > 0){
                element.css("height", height + "px");
            }
        };
        scope.$watch(attr.ngModel, function(){
            update();
        });
        attr.$set("ngTrim", "false");
    };
});