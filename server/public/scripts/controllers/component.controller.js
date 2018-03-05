myApp.controller('ComponentController', ['ComponentService', function (ComponentService) {
    console.log('ComponentController created');
    let self = this;

    self.componentLibrary = ComponentService.componentLibrary;

    self.componentItem = {
      consumable: false,
      general_stock_item: false
    };

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {
      console.log(component);
      ComponentService.addComponentToLib(component);
    }; // end addComponentToLib()


}]);
