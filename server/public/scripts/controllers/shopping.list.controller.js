myApp.controller('ShoppingListController', ['ShoppingListService', function (ShoppingListService) {
    console.log('ShoppingListController created');
    let self = this;

    self.shoppingLists = ShoppingListService.shoppingLists;
    self.components = ShoppingListService.components;
    // self.showHideTableData = false;

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
      console.log(component.ordered_inhouse_id);
      if (component.ordered_inhouse_id === null) {
        component.ordered = true;
        ShoppingListService.addOrderedInHouseToComponent(component);
      } else {
        component.ordered = !!component.ordered;
        console.log(component.ordered);
        ShoppingListService.updateOrderedInHouseComponent(component);
      }
        // ShoppingListService.updateOrdered(orderStatus);
    };//end function to call service

    //function: InHouse checkbox has been clicked
    self.updateInHouse = function(component) {
      console.log('in house', component.ordered_inhouse_id);
      if (component.ordered_inhouse_id === null) {
        component.in_house = true;
        ShoppingListService.addOrderedInHouseToComponent(component);
      } else {
        component.in_house = !!component.in_house;
        console.log(component.in_house);
        ShoppingListService.updateOrderedInHouseComponent(component);
      }
    };//end function to call service

    //function: print call
    self.printPage = function() {
        window.print();
    };
}]);
