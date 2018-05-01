myApp.service('ModuleService', ['$http', '$location', '$routeParams', '$interval', function ($http, $location, $routeParams, $interval) {
    let self = this;

    self.module = {};
    self.components = { data: [] };
    self.componentsSaved = {};
    self.calculations = { data: {}};

    self.moduleLibrary = {list:[{}]};
    self.hasUnsavedChanges = { status: false };


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/
    // get all modules
    self.getModules = function() {
        // get the modules
        $http.get(`/api/module/all`)
          .then( function(response) {
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
                $location.path('/module/' + response.data[0].id);
                swal({
                    title: `Module ${self.module.data.name} has been created!`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                })
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
                // no action on response
                // swal({
                //     title: `Module has been saved!`,
                //     icon: "success",
                //     timer: 1200,
                //     buttons: false
                // });
                self.hasUnsavedChanges.status = false;
            })
            .catch(error => {
                console.log('error in put', error);
            });
    };
    self.updateModuleComponent = function(component) {

        // reduce the row data to the junction table row's data
        let moduleComponentToSave = {
            module_id: $routeParams.id,
            component_id: component.component_id,
            pieces_per_kit: component.pieces_per_kit
        };

        $http.put('/api/module/components', moduleComponentToSave)
            .then(response => {
                // no action on response
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
                self.componentsSaved.data = response.data;

                self.updateModuleEverythingComponentsPost()
                self.updateModuleEverythingComponentsDelete();

                // UPDATE QUANTITIES
                for (let i = 0; i < self.components.data.length; i++) {
                    self.updateModuleComponent(self.components.data[i]);
                }

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
    
    self.deleteModule = function(moduleId) {
        $http.delete('/api/module/' + moduleId)
            .then(response => {
                self.getModules();
                swal({
                    title: `Module has been deleted!`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                })
            })
            .catch(error => {
                console.log('error in delete', error);
            });
    };
    self.deleteModuleComponent = function(moduleId, componentId) {        
        $http.delete('/api/module/components/' + moduleId + '/' + componentId)
            .then(response => {
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
    }

    // Note when there are new unsaved changes
    self.newUnsavedChange = function() {
        console.log(self.hasUnsavedChanges);
        self.hasUnsavedChanges.status = true;
    }

    // Save Module
    self.saveModule = function() {
        if ($routeParams.id) {
            self.updateModuleEverything();
        } else {
            self.createModule();
        }
    };

    self.sortModules = function(sortMethod) {
        $http.get(`/api/module/sorting/${sortMethod}`)
          .then( function(response) {
            self.moduleLibrary.list = response.data;
          })
          .catch( function(error) {
            console.log(error);
          });
      };
  
    // var requiredElements = document.getElementById("form").querySelectorAll(".requiredForAutosave"),
    // c = document.getElementById("check"),
    // o = document.getElementById("output");
    
    // c.addEventListener("click", function() {
    //   var s = "";
    //   for (var i = 0; i < requiredElements.length; i++) {
    //     var e = requiredElements[i];
    //     s += e.id + ": " + (e.value.length ? "Filled" : "Not Filled") + "<br>";
    //   }
    //   o.innerHTML = s;
    // });


    // Auto-save: check four times a second for changes, and auto-save them.
    $interval(function() {
        let requiredUnfilledCount = 0;

        console.log(self.hasUnsavedChanges);
        if (self.hasUnsavedChanges.status) {
            console.log('inside');
            // get all the inputs that are required (they have class 'requiredForSubmission')
            let requiredInputs = document.querySelectorAll('.requiredForSubmission');

            // check to see if any of them is empty
            for (let i = 0; i < requiredInputs.length; i++) {
                // if one is empty
                if (requiredInputs[i].value === '') {
                    // increase the count
                    requiredUnfilledCount++;
                }
            }
            
            // if they're all valid, save it and reset the unsaved marker
            if (requiredUnfilledCount === 0) {
                self.hasUnsavedChanges = false;
                self.saveModule();
            }   
        }
    }, 250);
    
}]);
