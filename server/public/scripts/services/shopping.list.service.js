myApp.service('ShoppingListService', ['$http', '$location', function ($http, $location) {
    console.log('ShoppingListService Loaded');
    let self = this;

    self.currentShoppingListId = { shopId: 0 };

    self.shoppingLists = {list:[{}]};

	/******************************************/
	/*              GET REQUESTS              */
	/******************************************/
    // get all shopping lists
    self.getShoppingLists = function() {
        $http.get('/api/shopping/all')
          .then( function(response) {
            self.shoppingLists.list = response.data;
            console.log('self.shoppingLists.list', self.shoppingLists.list);
            
          })
          .catch( function(error) {
            console.log(error);
          });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/
    self.createShoppingList = function (name) {
        console.log(name);
        let shoppingListObject = {
            name,
            date: new Date(),
            user_created_by: "name here"
        };
        $http.post('/api/shopping', shoppingListObject)
            .then((result) => {
                self.currentShoppingListId.shopId = result.data.rows[0]
            })
            .catch(function (err) {
                console.log('error in adding item', err);
            })
    } //function to create a shopping list


    self.saveShoppingList = function name(arrayOfModules) { //Start of function to save shopping lists with modules
        console.log(self.currentShoppingListId.shopId.id);
      console.log(arrayOfModules);
        $http.post(`/api/shopping/shoppinglist/${self.currentShoppingListId.shopId.id}`, arrayOfModules)
            .then(response => {
                console.log('response of save shopping list');
                $location.path('/shopping-list');
            })
            .catch(error => {
                console.log('error in shopping list save', error);
            })
    } //End of function to save shopping lists with modules

    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/



    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/



    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/



}]);
