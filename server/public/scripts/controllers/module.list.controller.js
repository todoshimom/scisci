myApp.controller('ModuleListController', ['ModuleService', function (ModuleService) {
    console.log('ModuleListController created');
    let self = this;

    self.moduleLibrary = ModuleService.moduleLibrary;

    // begin getModules()
    self.getModules = function() {
        ModuleService.getModules();
      }; // end getModules()
}]);
