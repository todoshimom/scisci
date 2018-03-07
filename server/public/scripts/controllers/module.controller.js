myApp.controller('ModuleController', ['ModuleService', '$http', '$routeParams', function (ModuleService, $http, $routeParams) {
    console.log('ModuleController created');
    let self = this;

    // MODULE OBJECT
    self.module = {};

    // CALCULATIONS
    self.calculations = {};
    self.calculations.material_cost = 0;
    self.calculations.material_in_kit_cost = 0;
    self.calculations.estimated_labor_cost = 0;
    self.calculations.materials_ordered_labor = 0;
    self.calculations.materials_in_kit_labor = 0;
    
    // CRUD REQUESTS

        // Read module
        self.getModule = function() {
            $http.get('/api/module/' + $routeParams.id)
                .then(response => {
                    console.log('get response', response);
                    self.module = response.data[0];
                })
                .catch(error => {
                    console.log('error in get', error);
                });
        };

        // Delete module
        self.deleteModule = function() {
            $http.delete('/api/module/' + self.module.id)
                .then(response => {
                    console.log('delete response', response);
                })
                .catch(error => {
                    console.log('error in delete', error);
                });
        };

        // Update module
        self.updateModule = function() {
            $http.put('/api/module', self.module)
                .then(response => {
                    console.log(self.module);
                    console.log('put response', response);
                })
                .catch(error => {
                    console.log('error in put', error);
                });
        };

        // Create module
        self.createModule = function() {
            $http.post('/api/module', self.module)
                .then(response => {
                    console.log('post response', response);
                })
                .catch(error => {
                    console.log('error in post', error);
                });
        };

    // OTHER FUNCTIONS

        // Save module: intelligently updates or creates an entry
        self.saveModule = function() {
            console.log('MODULE', self.module);
            if ($routeParams.id) {
                self.updateModule();
            } else {
                self.createModule();
            }
        };

    // ON PAGE LOAD

    // Check if the $routeParams is a valid ID (integer)
    if ($routeParams.id) {
        self.getModule();
    }

}]);
