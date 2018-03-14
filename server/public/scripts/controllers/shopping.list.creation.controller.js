myApp.controller('ShoppingListCreationController', ['ShoppingListService', 'UserService', 'ModuleService', function (ShoppingListService, UserService, ModuleService) {
    console.log('ShoppingListCreationController created');
    let self = this;

    self.userObject = UserService.userObject;
    console.log('userObject', self.userObject);
    
    self.moduleLibrary = ModuleService.moduleLibrary;
    self.currentShoppingListId = ShoppingListService.currentShoppingListId
    self.addedModuleLibrary = [];

    self.showSearchResults = false;
    self.showAddedModules = false;

    //function for start list button 
    self.createShoppingList = function(name, first_name, last_name) {
        ShoppingListService.createShoppingList(name, first_name, last_name);
    };//end function for start list button to database/service 

    self.getModules = function(keyword) {
        ShoppingListService.getModules(keyword);
    }

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
