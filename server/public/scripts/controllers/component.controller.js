myApp.controller('ComponentController', ['ComponentService', function (ComponentService) {
    console.log('ComponentController created');
    let self = this;

    self.componentLibrary = ComponentService.componentLibrary;

    self.edit = {};

    self.componentItem = {
      consumable: false,
      general_stock_item: false
    };

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {
      console.log(component);
      ComponentService.addComponentToLib(component);
    }; // end addComponentToLib()

    // begin modifyComponent()
    self.modifyComponent = function(component) {
      self.edit[component.id] = true;
    }; // end modifyComponent()

    // begin cancelEdit()
    self.cancelEdit = function(component) {
      self.edit[component.id] = false;
      ComponentService.getComponents();
    }; // end cancelEdit()

    // beign updateComponent()
    self.updateComponent = function(component) {
      self.edit[component.id] = false;
      console.log(component);
      ComponentService.updateComponent(component);
    }; // updateComponent()

    // begin deleteComponent()
    self.deleteComponent = function(componentId) {
      console.log(componentId);
      ComponentService.deleteComponent(componentId);
    }; // end deleteComponent()



}]);
