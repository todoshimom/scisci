myApp.controller('ReportController', ['ReportService', function (ReportService) {
    console.log('ReportController created');
    let self = this;

    self.moduleLibrary = ReportService.moduleLibrary;
    self.componentLibrary = ReportService.componentLibrary;
    self.moduleVersionLibrary = ReportService.moduleVersionLibrary;

    self.getModules = function () {
        ReportService.getModules();
    }
    self.getModules();
    self.getComponents = function () {
        ReportService.getComponents();
    }
    self.getComponents();

    self.getModuleVersions = function () {
        ReportService.getModuleVersions();
    }
    self.getModuleVersions();

}]);
