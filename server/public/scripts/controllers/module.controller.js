myApp.controller('ModuleController', ['ModuleService', '$http', '$routeParams', function (ModuleService, $http, $routeParams) {
    console.log('ModuleController created');
    let self = this;

    self.calculations = ModuleService.calculations;

    self.module = ModuleService.module;
    self.getModule = ModuleService.getModule;
    self.deleteModule = ModuleService.deleteModule;
    self.updateModule = ModuleService.updateModule;
    self.createModule = ModuleService.createModule;

    self.initializeData = ModuleService.initializeData;
    self.saveModule = ModuleService.saveModule;
    self.initializeData();

}]);
