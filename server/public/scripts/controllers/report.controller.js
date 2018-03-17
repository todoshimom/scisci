myApp.controller('ReportController', ['ReportService', function (ReportService) {
    console.log('ReportController created');
    let self = this;


   self.moduleLibrary = ReportService.moduleLibrary;
   self.componentLibrary = ReportService.componentLibrary;
   self.componentModules = ReportService.componentModules;
   self.moduleVersionLibrary = ReportService.moduleVersionLibrary;


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
     if (component.modules_used_in > 0) {
      self.componentModulesSelected = true;
      ReportService.getComponentModules (component);
     }
   };

   self.getModuleVersions = function () {
       ReportService.getModuleVersions();
   }
   self.getModuleVersions();

}]);
