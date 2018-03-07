myApp.controller('ShoppingListController', ['ShoppingListService', function (ShoppingListService) {
    console.log('ShoppingListController created');
    let self = this;

    self.addShoppingList = function(list) {
        ShoppingListService.addShoppingList(list);
    }//function to add selected shopping list to table
    
}]);
