myApp.controller('ShoppingListCreationController', ['ShoppingListService', function (ShoppingListService) {
    console.log('ShoppingListCreationController created');
    let self = this;
//function for start list button 
    self.createShoppingList = function(name) {
        ShoppingListService.createShoppingList(name);
    }
    
//function to save Shopping List (button)
//if checked box add to added modules
//functionality for add module checkbox 
//function for quantity inputs 
    
}]);
