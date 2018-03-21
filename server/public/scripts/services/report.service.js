myApp.service('ReportService', ['$http', '$location', 'ComponentService', function ($http, $location, ComponentService) {
    let self = this;

    self.moduleLibrary = { list: [] };
    self.components = ComponentService.componentLibrary;
    self.componentLibrary = { list: [] };
    self.moduleVersionLibrary = { list: [] };
    self.componentModules = ComponentService.componentModules;

    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/
    // get all modules
    self.getModules = function () {
        $http.get('/api/report/modules')
            .then(function (response) {
                self.moduleLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // get all components
    // begin getComponents()
    self.getComponents = function () {
        return ComponentService.getComponents();
    }; // end getComponents()

    // begin getAllComponents()
    self.getAllComponents = function () {
        self.getComponents()
            .then(function (componentData) {
                for (let component of componentData) {
                    $http.get(`/api/component/modulesCount/${component.id}`)
                        .then(function (response) {
                            component.modules_used_in = response.data[0].count;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                return componentData;
            })
            .then(function (componentData) {
                for (let component of componentData) {
                    $http.get(`/api/report/componentOrdered/${component.id}`)
                        .then(function (response) {
                            component.timesOrdered = response.data[0].count;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                self.componentLibrary.list = componentData;
            });
    }; // getAllComponents()

    self.getAllComponents();

    self.getComponentModules = function(component) {
      ComponentService.getModules(component);
    }; // end getModules()

    self.getModuleVersions = function () {
        $http.get('/api/report/version')
            .then(function (response) {
                self.moduleVersionLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };


}]);
