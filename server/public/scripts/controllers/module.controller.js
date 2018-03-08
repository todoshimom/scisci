myApp.controller('ModuleController', ['ModuleService', '$http', '$routeParams', function (ModuleService, $http, $routeParams) {
    console.log('ModuleController created');
    let self = this;

    self.calculations = ModuleService.calculations;

    self.module = ModuleService.module;
    self.components = ModuleService.components;

    self.addModuleComponent = ModuleService.addModuleComponent;
    self.updateModuleComponent = ModuleService.updateModuleComponent;
    self.deleteModuleComponent = ModuleService.deleteModuleComponent;
    
    // OTHER FUNCTIONS

        // Save module: intelligently updates or creates an entry
        self.saveModule = function() {
            console.log('MODULE', self.module);
            if ($routeParams.id) {
                self.updateModule();
            } else {
                self.createModule();
            }
        };
        
    self.initializeData = ModuleService.initializeData;
    self.saveModule = ModuleService.saveModule;
    self.initializeData();

}]);
