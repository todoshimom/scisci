myApp.controller('ReportController', ['ReportService', function (ReportService) {
    console.log('ReportController created');
    let self = this;

    self.getModulesReports = function () {
        console.log('hello');
        
        ReportService.getModulesReports()
    }
}]);
