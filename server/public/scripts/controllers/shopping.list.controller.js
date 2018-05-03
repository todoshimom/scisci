myApp.controller('ShoppingListController', ['ShoppingListService', function (ShoppingListService) {
    let self = this;

    self.shoppingLists = ShoppingListService.shoppingLists;
    self.components = ShoppingListService.components;
    // self.showHideTableData = false;
    self.componentComments = "";

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
        ShoppingListService.addOrderedInHouseToComponent(component);
      } else {
        component.ordered = !component.ordered;
        ShoppingListService.updateOrderedInHouseComponent(component);
      }
        // ShoppingListService.updateOrdered(orderStatus);
    };//end function to call service

    //function: InHouse checkbox has been clicked
    self.updateInHouse = function(component) {
      if (component.ordered_inhouse_id === null) {
        component.in_house = true;
        ShoppingListService.addOrderedInHouseToComponent(component);
      } else {
        component.in_house = !component.in_house;
        ShoppingListService.updateOrderedInHouseComponent(component);
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
}]);
