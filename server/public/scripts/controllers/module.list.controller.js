myApp.controller('ModuleListController', ['ModuleService', function (ModuleService) {
    let self = this;

    self.moduleLibrary = ModuleService.moduleLibrary;

    // tooltip controls
    self.docTooltip = {
        showTooltip: false,
        tipDirection: "bottom"
    };
    // end tooltip controls

    // begin deleteModule()
    self.deleteModule = function(moduleId) {
        ModuleService.deleteModule(moduleId);
    }; // end deleteModule()

    // begin getModules()
    self.getModules = function() {
        ModuleService.getModules();
      }; // end getModules()

    self.getModules();

    self.sortColumns = function(sortMethod) {
        ModuleService.sortModules(sortMethod);
    };
}]);
