myApp.controller('ModuleController', ['ModuleService', '$http', '$routeParams', function (ModuleService, $http, $routeParams) {
    console.log('ModuleController created');
    let self = this;

    self.calculations = ModuleService.calculations;

    self.module = ModuleService.module;
    self.components = ModuleService.components;

    self.initializeData = ModuleService.initializeData;
    self.saveModule = ModuleService.saveModule;
    self.initializeData();

}]);
