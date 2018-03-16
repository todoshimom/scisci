myApp.service('ReportService', ['$http', '$location', 'ComponentService', function ($http, $location, ComponentService) {
    console.log('ReportService Loaded');
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
                console.log("getting module response", response.data);
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
                console.log(componentData);
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
                console.log(componentData);
                self.componentLibrary.list = componentData;
            });
    }; // getAllComponents()

    self.getAllComponents();

    self.getComponentModules = function (component) {
        ComponentService.getModules(component);
        console.log(self.componentModules);
    }; // end getModules()

    self.getModuleVersions = function () {
        $http.get('/api/report/version')
            .then(function (response) {
                console.log("getting module versions response", response.data);
                self.moduleVersionLibrary.list = response.data;
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
