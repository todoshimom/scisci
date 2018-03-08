myApp.controller('ShoppingListCreationController', ['ShoppingListService', function (ShoppingListService) {
    console.log('ShoppingListCreationController created');
    let self = this;
//function for start list button 
    self.createShoppingList = function(name) {
        ShoppingListService.createShoppingList(name);
    };//end function for start list button to database/service 
    
//get request to get modules for search with filter that adds them to the first table automatically after an update
    self.getModules = function(keyword) {
        ShoppingListService.getModules(keyword);
    }
// function for checkbox to populate selected modules in the bottom table (post) 
  
// function to save created list to populate in the dropdown on the shopping list view (post)
    
}]);
