myApp.controller('ShoppingListController', ['ShoppingListService', function (ShoppingListService) {
    console.log('ShoppingListController created');
    let self = this;

    self.shoppingLists = ShoppingListService.shoppingLists;
    self.components = ShoppingListService.components;
    self.showHideTableData = false;

    self.addShoppingList = function(list) {
        ShoppingListService.addShoppingList(list);
    }//function to add selected shopping list to table

    self.getuser = function () {
        UserService.getuser();
    }

    // begin getShoppingLists()
    self.getShoppingLists = function() {
        ShoppingListService.getShoppingLists();
      }; // end getShoppingLists()
    self.getShoppingLists();
    
    self.getComponents = function() {
        ShoppingListService.getComponents();
    }; //end getComponents()
    self.getComponents();

    self.orderStatus = false;
    self.inHouseStatus = false;
    //function: ordered checkbox has been clicked 
    self.updateOrdered = function(orderStatus) {
        ShoppingListService.updateOrdered(orderStatus);
    }//end function to call service 

    //function: InHouse checkbox has been clicked
    self.updateInHouse = function(inHouseStatus) {
        ShoppingListService.updateInHouse(inHouseStatus);
    }//end function to call service
}]);
