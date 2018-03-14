myApp.service('ModuleService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    console.log('ModuleService Loaded');
    let self = this;

    self.module = {};
    self.components = { data: [] };
    self.componentsSaved = {};
    self.calculations = { data: {}};

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
    self.getModules(); //Calls all modules on service load (mainly for shopping list creation area)
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

                self.getCostRates();
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

    self.getCostRates = function() {
        $http.get('/api/module/cost/rates/' + $routeParams.id)
            .then(response => {
                self.calculations.data = response.data;
                console.log('get response for cost rates single module', self.calculations);

            })
            .catch(error => {
                console.log('error in get single module cost rates', error);
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
            console.log('response', response);
            self.getModule();
        })
        .catch(error => {
            console.log('error in add module component', error);
        });

    }

    // Draft version
    self.addModuleComponentToDraft = function(componentId, piecesPerKit = 0, componentData) {
        if(!piecesPerKit) {
            piecesPerKit = 0;
        }
        console.log('componentData', componentData);

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
                    // module_id: 34, // not needed?
                    component_id: componentId, 
                    pieces_per_kit: piecesPerKit,
                    id: componentData.id,
                    name: componentData.name,
                    description: componentData.description,
                    vendor_name_primary: componentData.vendor_name_primary,
                    vendor_url_primary: componentData.vendor_url_primary,
                    vendor_name_secondary: componentData.vendor_name_secondary,
                    vendor_url_secondary: componentData.vendor_url_secondary,
                    notes: componentData.notes,
                    price_per_unit: componentData.price_per_unit,
                    pieces_per_unit: componentData.pieces_per_unit,
                    consumable: componentData.consumable,
                    type: componentData.type,
                    general_stock_item: componentData.general_stock_item
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
            module_id: component.module_id,
            component_id: component.component_id,
            pieces_per_kit: component.pieces_per_kit
        };
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

    // Post new module components
    self.updateModuleEverythingComponentsPost = function() {
        // Get list of components to post
        let componentsToPost = [];
        for (let i = 0; i < self.components.data.length; i++) {
            
            // if the array length is zero, you can't check it, so just push it.
            if (self.componentsSaved.data.length == 0) {
                componentsToPost.push(self.components.data[i]);
            } else {
                for (let j = 0; j < self.componentsSaved.data.length; j++) {
                    console.log(i, j, self.components.data[i].component_id, self.componentsSaved.data[j].component_id);
                    if (self.components.data[i].component_id == self.componentsSaved.data[j].component_id) {
                        break;
                    }
                    if (j == self.componentsSaved.data.length - 1) {
                        componentsToPost.push(self.components.data[i]);
                    }
                }
            }
        }
        for (let i = 0; i < componentsToPost.length; i++) {
            self.addModuleComponent(componentsToPost[i].component_id, componentsToPost[i].pieces_per_kit);
        }
    };

    // Delete Module Components
    self.updateModuleEverythingComponentsDelete = function() {
        // Get list of components to delete
        let componentsToDelete = [];
        for (let i = 0; i < self.componentsSaved.data.length; i++) {

            // if the array length is zero, you can't check it, so just push it.
            if (self.components.data.length == 0) {
                componentsToDelete.push(self.componentsSaved.data[i]);
            } else {
                for (let j = 0; j < self.components.data.length; j++) {
                    if (self.componentsSaved.data[i].component_id == self.components.data[j].component_id) {
                        break;
                    }
                    if (j == self.components.data.length - 1) {
                        componentsToDelete.push(self.componentsSaved.data[i]);
                    }
                }
            }
        }
        for (let i = 0; i < componentsToDelete.length; i++) {
            self.deleteModuleComponent(self.module.data.id, componentsToDelete[i].component_id);
        }
    };

    self.updateModuleEverything = function() {
        // self.getModuleComponentsPreSave();

        $http.get('/api/module/components/' + $routeParams.id)
            .then(response => {
                console.log('get response', response.data);
                self.componentsSaved.data = response.data;

                self.updateModuleEverythingComponentsPost()
                self.updateModuleEverythingComponentsDelete();

                // -----
                // UPDATE QUANTITIES
                for (let i = 0; i < self.components.data.length; i++) {
                    self.updateModuleComponent(self.components.data[i]);
                }

                // -----
                // UPDATE THE MODULE
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

    // // check if we're on an individual page or on the creator page
    // self.isSavedModule = {value: false};
    // if($routeParams.id) {
    //     self.isSavedModule.value = true;
    // }
  
}]);
