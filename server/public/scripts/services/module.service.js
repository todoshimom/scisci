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

    self.addModuleComponent = function(componentId, piecesPerKit) {
        const dataToSend = {
            module_id: $routeParams.id,
            component_id: componentId,
            pieces_per_kit: piecesPerKit
        };
        
        // // confirm that the component is not already attached to the module before adding
        // let componentIsInModule = false;
        // for (let i = 0; i < self.components.data.length; i++) {
        //     if (self.components.data[i].component_id == componentId) {
        //         componentIsInModule = true;
        //     }
        // }

        // if it isn't already here, then add it.
        // if (!componentIsInModule) {
            $http.post('/api/module/components', dataToSend)
            .then(response => {
                console.log('response', response);
                self.getModule();
            })
            .catch(error => {
                console.log('error in add module component', error);
            });
        // } else {
        //     alert('already in module');
        // }

    }

    // Draft version
    self.addModuleComponentToDraft = function(componentId, piecesPerKit) {

        // check if it's already in the module
        let componentIsInModule = false;
        for (let i = 0; i < self.components.data.length; i++) {
            if (self.components.data[i].component_id == componentId) {
                componentIsInModule = true;
            }
        }

        // if it isn't already here, then add it.
        if (!componentIsInModule) {
            // unshift that component to the list
            // TODO: remove dummy data with live data from suggest box
            self.components.data.unshift(
                {
                    component_id: componentId, module_id: 34, pieces_per_kit: piecesPerKit,
                    "id":100,"name":"3 ring binder","description":"a binder","vendor_name_primary":"amazon","vendor_url_primary":"www.amazon.com","vendor_name_secondary":null,"vendor_url_secondary":null,"notes":"used to hold papers","price_per_unit":"3.00","pieces_per_unit":1,"consumable":false,"type":"binder","general_stock_item":true
                }
            );
        } else {
            alert('already in module');
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

    self.updateModuleEverything = function() {
        // self.getModuleComponentsPreSave();

        $http.get('/api/module/components/' + $routeParams.id)
            .then(response => {
                console.log('get response', response.data);
                self.componentsSaved.data = response.data;

                console.log(self.components.data, self.componentsSaved.data);

                // POST COMPONENTS
                // Get list of components to post
                let componentsToPost = [];
                for (let i = 0; i < self.components.data.length; i++) {
                    for (let j = 0; j < self.componentsSaved.data.length; j++) {
                        if (self.components.data[i].component_id == self.componentsSaved.data[j].component_id) {
                            break;
                        }
                        if (j == self.componentsSaved.data.length - 1) {
                            componentsToPost.push(self.components.data[i]);
                        }
                    }
                }
                console.log('to post:', componentsToPost);
                for (let i = 0; i < componentsToPost.length; i++) {
                    console.log('post this:', i, componentsToPost[i]);
                    self.addModuleComponent(componentsToPost[i].component_id, componentsToPost[i].pieces_per_kit);
                }

                // DELETE COMPONENTS
                // Get list of components to delete
                let componentsToDelete = [];
                for (let i = 0; i < self.componentsSaved.data.length; i++) {
                    for (let j = 0; j < self.components.data.length; j++) {
                        if (self.componentsSaved.data[i].component_id == self.components.data[j].component_id) {
                            break;
                        }
                        if (j == self.components.data.length - 1) {
                            componentsToDelete.push(self.componentsSaved.data[i]);
                        }
                    }
                }
                // console.log('to delete:', componentsToDelete);
                for (let i = 0; i < componentsToDelete.length; i++) {
                    console.log('delete this:', i, componentsToDelete[i]);
                    self.deleteModuleComponent(self.module.data.id, componentsToDelete[i].component_id);
                }


                // PUT THE MODULE
                self.updateModule();

            })
            .catch(error => {
                console.log('error in get', error);
            });

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

    // Deletes a component from the draft, so that it can be saved with the module save button
    self.deleteModuleComponentInDraft = function(moduleId, componentId) {
        for (let i = 0; i < self.components.data.length; i++) {
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
            // self.updateModule();
            self.updateModuleEverything();
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
