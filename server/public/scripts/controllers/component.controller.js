myApp.controller('ComponentController', ['ComponentService', function (ComponentService) {
    console.log('ComponentController created');
    let self = this;

    self.componentLibrary = ComponentService.componentLibrary;
    self.componentModules = ComponentService.componentModules;
    self.yesNo = {
      yes: 'yes',
      no: 'no'
    };

    self.componentName = null;

    self.moduleViewer = false;

    self.edit = {};

    self.sort = {
      sortName: true
    };

    self.componentItem = {
      consumable: false,
      general_stock_item: false
    };

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {
      console.log(component);
      ComponentService.addComponentToLib(component);
      self.componentItem = {
        consumable: false,
        general_stock_item: false
      };
    }; // end addComponentToLib()

    // beign updateComponent()
    self.updateComponent = function(component) {
      ComponentService.updateComponent(component);

      self.showEdit = !self.showEdit;

    }; // updateComponent()

    // begin deleteComponent()
    self.deleteComponent = function(componentId) {
      console.log(componentId);
      ComponentService.deleteComponent(componentId);
    }; // end deleteComponent()

    self.sortColumns = function(sortMethod) {
      console.log(sortMethod);
      ComponentService.sortAllComponents(sortMethod);
    };

    self.getModules = function(component) {
      if (component.modules_used_in > 0) {
        self.componentName = component.name;
        self.moduleViewer = true;
        ComponentService.getModules(component);
      }
    };

    self.backToComponents = function() {
      self.moduleViewer = false;
    };

}]);
