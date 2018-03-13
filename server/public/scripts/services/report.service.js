myApp.service('ReportService', ['$http', '$location', function ($http, $location) {
    console.log('ReportService Loaded');
    let self = this;


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    self.getModulesReports = function () {
        $http.get('/api/report/modules')
            .then(function (response) {
                console.log('module response', response);

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/



    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/



    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/



    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/



}]);
