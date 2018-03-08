myApp.service('ModuleService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    console.log('ModuleService Loaded');
    let self = this;

    self.module = {};
    self.components = {};

    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    self.getModule = function() {
        $http.get('/api/module/' + $routeParams.id)
            .then(response => {
                console.log('get response', response.data[0]);
                self.module.data = response.data[0];
                
                // get this module's components
                self.getModuleComponents();
            })
            .catch(error => {
                console.log('error in get', error);
            });
    };
    self.getModuleComponents = function() {
        $http.get('/api/module/components/' + $routeParams.id)
            .then(response => {
                console.log('get response', response.data);
                self.components.data = response.data;
            })
            .catch(error => {
                console.log('error in get', error);
            });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    self.createModule = function() {
        $http.post('/api/module', self.module.data)
            .then(response => {
                console.log('self.module.data', self.module.data);
                console.log('post response', response);
                $location.path('/module/' + response.data[0].id);
            })
            .catch(error => {
                console.log('error in post', error);
            });
    };
    self.addModuleComponent = function(componentId, piecesPerKit) {
        const dataToSend = {
            module_id: $routeParams.id,
            component_id: componentId,
            pieces_per_kit: piecesPerKit
        };
        $http.post('/api/module/components', dataToSend)
            .then(response => {
                console.log(dataToSend);
                console.log('response', response);
                self.getModule();
            })
            .catch(error => {
                console.log('error in add module component', error);
            })
    }


    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/

    self.updateModule = function() {
        $http.put('/api/module', self.module.data)
            .then(response => {
                console.log(self.module.data);
                console.log('put response', response);
            })
            .catch(error => {
                console.log('error in put', error);
            });
    };


    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/

    self.deleteModule = function() {
        $http.delete('/api/module/' + self.module.data.id)
            .then(response => {
                console.log('delete response', response);
            })
            .catch(error => {
                console.log('error in delete', error);
            });
    };


    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/

    // CALCULATIONS
    self.calculations = {};
    self.calculations.material_cost = 0;
    self.calculations.material_in_kit_cost = 0;
    self.calculations.estimated_labor_cost = 0;
    self.calculations.materials_ordered_labor = 0;
    self.calculations.materials_in_kit_labor = 0;
    
    // Initialize page: blank item if old, get item if new
    self.initializeData = function() {
        if ($routeParams.id) {
            self.getModule();
        } else {
            self.module.data = {};
        }
        console.log('intiializedata');
    }

    // Save Module
    self.saveModule = function() {
        console.log('MODULE', self.module);
        if ($routeParams.id) {
            self.updateModule();
        } else {
            self.createModule();
        }
    };

}]);
