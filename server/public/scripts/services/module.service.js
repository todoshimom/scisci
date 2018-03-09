myApp.service('ModuleService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    console.log('ModuleService Loaded');
    let self = this;

    self.module = {};
    self.components = {};
    self.componentsSaved = {};

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

    self.getModuleComponentsPreSave = function() {
        $http.get('/api/module/components/' + $routeParams.id)
            .then(response => {
                console.log('get response', response.data);
                self.componentsSaved.data = response.data;
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

    // MAKE A DRAFT VERSION
    self.addModuleComponent = function(componentId, piecesPerKit) {
        const dataToSend = {
            module_id: $routeParams.id,
            component_id: componentId,
            pieces_per_kit: piecesPerKit
        };
        
        // confirm that the component is not already attached to the module before adding
        let componentIsInModule = false;
        for (let i = 0; i < self.components.data.length; i++) {
            if (self.components.data[i].component_id == componentId) {
                componentIsInModule = true;
            }
        }

        // if it isn't already here, then add it.
        if (!componentIsInModule) {
            $http.post('/api/module/components', dataToSend)
            .then(response => {
                console.log('response', response);
                self.getModule();
            })
            .catch(error => {
                console.log('error in add module component', error);
            })
        } else {
            console.log('true');
        }

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
    self.updateModuleComponent = function(component) {

        // reduce the row data to the junction table row's data
        let moduleComponentToSave = {
            id: component.id,
            module_id: component.module_id,
            component_id: component.component_id,
            pieces_per_kit: component.pieces_per_kit
        }
        console.log(moduleComponentToSave);

        $http.put('/api/module/components', moduleComponentToSave)
            .then(response => {
                console.log('sent in put:', moduleComponentToSave);
                console.log('put response', response);
            })
            .catch(error => {
                console.log('error in put', error);
            });
    };

    self.updateModuleComponents = function() {
        self.getModuleComponentsPreSave();

        // diff self.componentsSaved.data and self.components.data;
        let componentsToDelete = [];
        let componentsToPost = [];

        for (let i = 0; i < self.components.data.length; i++) {
            let existsInBoth = false;
            for (let j = 0; j < self.componentsSaved.data.length; j++) {
                if (self.components.data[i] == self.componentsSaved.data[j] ) {
                    existsInBoth = true;
                }
                // only run this check if we don't know if it exists in both
                if (!existsInBoth) {
                    // on the last step
                    if (j == self.componentsSaved.data.length - 1) {
                        componentsToDelete.push(self.componentsSaved.data[j])
                    }
                }
            }
        }

        for (let i = 0; i < self.components.data.length; i++) {
            let existsInBoth = false;
            for (let j = 0; j < self.components.data.length; j++) {
                if (self.componentsSaved.data[i] == self.components.data[j] ) {
                    existsInBoth = true;
                }
                // only run this check if we don't know if it exists in both
                if (!existsInBoth) {
                    // on the last step
                    if (j == self.components.data.length - 1) {
                        componentsToPost.push(self.componentsSaved.data[j])
                    }
                }
            }
        }

        console.log('saved,', self.componentsSaved)
        conosle.log('components,', self.components);

        for (let i = 0; i < self.components.data.length; i++) {
            self.updateModuleComponent(self.components.data[i]);
        }
    };

    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/

    // TODO: prompt user to confirm before delete
    
    self.deleteModule = function(moduleId) {
        console.log('in delete module');
        
        $http.delete('/api/module/' + moduleId)
            .then(response => {
                console.log('delete response', response);
                self.getModules();
            })
            .catch(error => {
                console.log('error in delete', error);
            });
    };
    self.deleteModuleComponent = function(moduleId, componentId) {
        console.log('in delete module');
        
        $http.delete('/api/module/components/' + moduleId + '/' + componentId)
            .then(response => {
                console.log('delete response', response);
                self.getModuleComponents();
            })
            .catch(error => {
                console.log('error in delete', error);
            });
    };
    self.deleteModuleComponentInDraft = function(moduleId, componentId) {
        console.log(self.components);
        self.getModuleComponentsPreSave();
        console.log(self.componentsSaved);
        for (let i = 0; i < self.components.data.length; i++) {
            console.log('hi');
            if (self.components.data[i].module_id == moduleId && self.components.data[i].component_id == componentId) {
                self.components.data.splice(i, 1);
                break;
            }
        }
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
            self.updateModuleComponents();
        } else {
            self.createModule();
        }
    };

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
