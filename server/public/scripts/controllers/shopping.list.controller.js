myApp.controller('ShoppingListController', ['ShoppingListService', '$routeParams', function (ShoppingListService, $routeParams) {
    let self = this;

    self.Math = Math;

    self.shoppingLists = ShoppingListService.shoppingLists;
    self.components = ShoppingListService.components;

    self.totalCosts = ShoppingListService.totalCosts;

    self.currentId = null;

    self.componentComments = "";

    self.sortColumnsClientSide = ShoppingListService.sortColumnsClientSide;

    self.addShoppingList = function(list) {
        ShoppingListService.addShoppingList(list);
    };//function to add selected shopping list to table

    self.getuser = function () {
        UserService.getuser();
    };

    // begin getShoppingLists()
    self.getShoppingLists = function() {
        ShoppingListService.getShoppingLists();
      }; // end getShoppingLists()
    self.getShoppingLists();

    self.getComponents = function(listId) {
        ShoppingListService.getComponents(listId);
    }; //end getComponents()

    //function: ordered checkbox has been clicked
    self.updateOrdered = function(component) {
      if (component.ordered_inhouse_id === null) {
        component.ordered = true;
        ShoppingListService.addOrderedInHouseCommentsComponent(component);
      } else {
        component.ordered = !component.ordered;
        ShoppingListService.updateOrderedInHouseCommentsComponent(component);
      }
        // ShoppingListService.updateOrdered(orderStatus);
    };//end function to call service

    //function: InHouse checkbox has been clicked
    self.updateInHouse = function(component) {
      if (component.ordered_inhouse_id === null) {
        component.in_house = true;
        ShoppingListService.addOrderedInHouseCommentsComponent(component);
      } else {
        component.in_house = !component.in_house;
        ShoppingListService.updateOrderedInHouseCommentsComponent(component);
      }
    };//end function to call service

    self.saveComments = function(component) {
      if (component.ordered_inhouse_id === null) {
        ShoppingListService.addOrderedInHouseCommentsComponent(component);
      } else {
        ShoppingListService.updateOrderedInHouseCommentsComponent(component);
      }
    };

    //function: print call
    self.printPage = function() {
        window.print();
    };

    // if on a solo page, get the components, otherwise, hide the components
    if($routeParams.id) {
      ShoppingListService.getComponents($routeParams.id);
      self.currentId = $routeParams.id;
    } else {
      ShoppingListService.components.list = [];
      self.currentId = null;
    }
}]);
