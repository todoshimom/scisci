myApp.controller('ModuleController', ['ModuleService', 'ComponentService', '$http', '$routeParams', '$scope', '$rootScope', '$timeout', function (ModuleService, ComponentService, $http, $routeParams, $scope, $rootScope, $timeout) {
    console.log('ModuleController created');
    let self = this;

    self.calculations = ModuleService.calculations;

    // for unsaved changes
    self.newUnsavedChange = ModuleService.newUnsavedChange;
    self.hasUnsavedChanges = ModuleService.hasUnsavedChanges;
    self.hasUnsavableChanges = ModuleService.hasUnsavableChanges;

    self.module = ModuleService.module;
    self.components = ModuleService.components;
    self.componentsSaved = ModuleService.componentsSaved;

    $scope.Math = window.Math;

    self.yesNo = {
        yes: 'yes',
        no: 'no'
      };

    self.addModuleComponent = ModuleService.addModuleComponent;
    self.addModuleComponentToDraft = ModuleService.addModuleComponentToDraft;
    self.updateModuleComponent = ModuleService.updateModuleComponent;
    self.deleteModuleComponent = ModuleService.deleteModuleComponent;
    self.deleteModuleComponentInDraft = ModuleService.deleteModuleComponentInDraft;


    // GET COMPONENTS
    self.getAllComponents = ComponentService.getAllComponents;
    self.componentLibrary = ComponentService.componentLibrary;
    self.getAllComponents();

    // OTHER FUNCTIONS
    self.initializeData = ModuleService.initializeData;
    self.saveModule = ModuleService.saveModule;
    self.initializeData();

    // check if we're on an individual page or on the creator page
    self.isSavedModule = {value: false};
    if($routeParams.id) {
        self.isSavedModule.value = true;
    };

    self.showAllComponents = false;

}]);
