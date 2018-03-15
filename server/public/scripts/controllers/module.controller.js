myApp.controller('ModuleController', ['ModuleService', 'ComponentService', '$http', '$routeParams', function (ModuleService, ComponentService, $http, $routeParams) {
    console.log('ModuleController created');
    let self = this;

    self.calculations = ModuleService.calculations;

    self.module = ModuleService.module;
    self.components = ModuleService.components;
    self.componentsSaved = ModuleService.componentsSaved;

    self.addModuleComponent = ModuleService.addModuleComponent;
    self.addModuleComponentToDraft = ModuleService.addModuleComponentToDraft;
    self.updateModuleComponent = ModuleService.updateModuleComponent;
    self.deleteModuleComponent = ModuleService.deleteModuleComponent;
    self.deleteModuleComponentInDraft = ModuleService.deleteModuleComponentInDraft;


    // GET COMPONENTS
    self.getAllComponents = ComponentService.getAllComponents;
    self.componentLibrary = ComponentService.componentLibrary;
    self.getAllComponents();
    console.log(ComponentService.componentLibrary.list);

    // OTHER FUNCTIONS

        // // Save module: intelligently updates or creates an entry
        // self.saveModule = function() {
        //     console.log('MODULE', self.module);
        //     if ($routeParams.id) {
        //         self.updateModule();
        //     } else {
        //         self.createModule();
        //     }
        // };
        
    self.initializeData = ModuleService.initializeData;
    self.saveModule = ModuleService.saveModule;
    self.initializeData();

    // // check if we're on an individual page or on the creator page
    // self.isSavedModule = ModuleService.isSavedModule;
    self.isSavedModule = {value: false};
    if($routeParams.id) {
        self.isSavedModule.value = true;
    };

}]);
