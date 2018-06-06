myApp.controller('ModuleController', ['ModuleService', 'ComponentService', '$http', '$routeParams', '$scope', '$rootScope', '$timeout', '$interval', function (ModuleService, ComponentService, $http, $routeParams, $scope, $rootScope, $timeout, $interval) {
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

        // Auto-save: check four times a second for changes, and auto-save them.
        $interval(function() {

            if (self.hasUnsavedChanges.status) {
                
                // track the number of required forms that are invalid
                let requiredUnfilledCount = 0;

                // get all the inputs that are required (they have class 'requiredForSubmission')
                let requiredInputs = document.querySelectorAll('.requiredForSubmission');

                // check to see if any of them is empty
                for (let i = 0; i < requiredInputs.length; i++) {
                    // if one is empty
                    if (requiredInputs[i].value === '') {
                        // increase the count
                        requiredUnfilledCount++;
                    }
                }
                
                // if they're all valid, save it and reset the unsaved marker
                if (requiredUnfilledCount > 0) {
                    self.hasUnsavableChanges.status = true;
                } else {
                    self.hasUnsavableChanges.status = false;
                    
                    self.saveModule();
                }
            }
        }, 250);
    };

    self.showAllComponents = false;




}]);
