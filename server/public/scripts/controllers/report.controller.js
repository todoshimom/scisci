myApp.controller('ReportController', ['ReportService', function (ReportService) {
    console.log('ReportController created');
    let self = this;


   self.moduleLibrary = ReportService.moduleLibrary;
   self.componentLibrary = ReportService.componentLibrary;
   self.componentModules = ReportService.componentModules;
   self.moduleVersionLibrary = ReportService.moduleVersionLibrary;
   self.ComponentModulesSelected = false

   console.log(self.componentLibrary);

   self.getModules = function() {
       ReportService.getModules();
   }
   self.getModules();
   self.getComponents = function() {
       ReportService.getComponents();
   }
   // self.getComponents();

   self.getComponentModules = function(component) {
     ReportService.getComponentModules (component);
     self.ComponentModulesSelected = true;
   };

   self.getModuleVersions = function () {
       ReportService.getModuleVersions();
   }
   self.getModuleVersions();

   self.backToReports = function() {
     self.ComponentModulesSelected = false
   };

}]);
