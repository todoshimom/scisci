myApp.service('ModuleService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    console.log('ModuleService Loaded');
    let self = this;

    self.module = {};

    self.moduleLibrary = {list:[{}]};

    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/
    // get all modules
    self.getModules = function() {
        // get the modules
        console.log('modules got with a get');
        $http.get(`/api/module/all`)
          .then( function(response) {
            console.log(response.data);
            self.moduleLibrary.list = response.data;
          })
          .catch( function(error) {
            console.log(error);
          });
        
    };

    // get single module
    self.getModule = function() {
        $http.get('/api/module/' + $routeParams.id)
            .then(response => {
                console.log('get response', response);
                self.module.data = response.data[0];
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
            })
            .catch(error => {
                console.log('error in post', error);
            });
    };


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

    self.deleteModule = function(moduleId) {
        console.log('in delete module');
        
        $http.delete('/api/module/' + moduleId)
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
    // TODO: Check if the $routeParams is a valid ID (integer)
    self.initializeData = function() {
        if ($routeParams.id) {
            self.getModule();
        } else {
            self.module.data = {};
        }
    }
    // TODO: Show 404 if no results come back


    self.sortModules = function(sortMethod) {
        $http.get(`/api/module/sorting/${sortMethod}`)
          .then( function(response) {
            console.log(response.data);
            self.moduleLibrary.list = response.data;
          })
          .catch( function(error) {
            console.log(error);
          });
      };
  
}]);
