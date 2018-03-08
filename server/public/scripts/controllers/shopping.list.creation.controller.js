myApp.controller('ShoppingListCreationController', ['ShoppingListService', 'UserService', 'ModuleService', function (ShoppingListService, UserService, ModuleService) {
    console.log('ShoppingListCreationController created');
    let self = this;

    self.userObject = UserService.userObject;
    console.log('userObject', self.userObject);
    
    self.moduleLibrary = ModuleService.moduleLibrary;
    self.addedModuleLibrary = []

    //function for start list button 
    self.createShoppingList = function(name, first_name, last_name) {
        ShoppingListService.createShoppingList(name, first_name, last_name);
    };//end function for start list button to database/service 
    self.getModules = function(keyword) {
        ShoppingListService.getModules(keyword);
    }
// function for checkbox to populate selected modules in the bottom table (post) 
  
// function to save created list to populate in the dropdown on the shopping list view (post)
    

self.addModule = function (moduleData) {
    //Have to catch duplicate adds when pushed, for loop if this is approved.        
    self.addedModuleLibrary.push(moduleData);
    console.log(self.addedModuleLibrary);

}


self.saveShoppingList = function name(arrayOfModules) {
    ShoppingListService.saveShoppingList(arrayOfModules
    )
}


}]);
