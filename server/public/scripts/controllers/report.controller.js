myApp.controller('ReportController', ['ReportService', function (ReportService) {
    console.log('ReportController created');
    let self = this;


   self.moduleLibrary = ReportService.moduleLibrary;
   self.componentLibrary = ReportService.componentLibrary;
   self.componentModules = ReportService.componentModules;
   self.moduleVersionLibrary = ReportService.moduleVersionLibrary;
   self.ComponentModulesSelected = false
   self.labels = [];
   self.data = [];
   self.showNew = false;

   self.showChart = function (data) {
       console.log(data);
        self.totalKitSum = data.totalKitSum
        self.totalLaborCost = data.totalLaborCost
        self.totalMatKitSum = data.totalMatKitSum
        self.chartModule = data.labordata[0].name
        self.labels = ['Total Materials in Kit Cost', 'Total Labor Cost'];
        self.data = [Math.round(data.totalKitSum), Math.round(data.totalLaborCost)];
        self.showNew = true
        console.log(self.data);
        console.log(self.labels);
   }

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

   ReportService.getAllComponents();

}]);
