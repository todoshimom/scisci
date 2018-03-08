myApp.controller('ShoppingListController', ['ShoppingListService', function (ShoppingListService) {
    console.log('ShoppingListController created');
    let self = this;

    self.addShoppingList = function(list) {
        ShoppingListService.addShoppingList(list);
    }//function to add selected shopping list to table

    // function to take selected shopping list from drop down and populate list below 
    // function to print list (will need to ask someone about this)

    self.getuser = function () {
        UserService.getuser();
    }
}]);
