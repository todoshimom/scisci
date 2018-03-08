myApp.controller('ShoppingListCreationController', ['ShoppingListService', 'UserService', function (ShoppingListService, UserService) {
    console.log('ShoppingListCreationController created');
    let self = this;

    self.userObject = UserService.userObject;
    console.log('userObject', self.userObject);
    

    //function for start list button 
    self.createShoppingList = function(name, first_name, last_name) {
        ShoppingListService.createShoppingList(name, first_name, last_name);
    };//end function for start list button to database/service 

    //get request to get modules for search with filter that adds them to the first table automatically after an update
    self.getModules = function(keyword) {
        ShoppingListService.getModules(keyword);
    }
// function for checkbox to populate selected modules in the bottom table (post) 
  
// function to save created list to populate in the dropdown on the shopping list view (post)
    
}]);
