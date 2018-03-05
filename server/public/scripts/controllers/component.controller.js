myApp.controller('ComponentController', ['ComponentService', function (ComponentService) {
    console.log('ComponentController created');
    let self = this;

    self.componentItem = {
      consumable: false,
      general_stock_item: false
    };

    self.addComponentToLib = function(component) {
      console.log(component);
      ComponentService.addComponentToLib(component);
    };


}]);
