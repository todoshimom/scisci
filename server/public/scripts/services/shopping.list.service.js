myApp.service('ShoppingListService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    let self = this;

    self.shoppingLists = {list:[]};
    self.components = {list: []};
    self.currentShoppingListId = { shopId: 0 };

	/******************************************/
	/*              GET REQUESTS              */
	/******************************************/
    // get all shopping lists
    self.getShoppingLists = function() {
        $http.get('/api/shopping/all')
          .then( function(response) {
            self.shoppingLists.list = response.data;
          })
          .catch( function(error) {
            console.log(error);
          });
    };
    //function to get components for the shopping list selected
    self.getComponents = function(listId) {
        $http.get(`/api/shopping/components/${listId}`)
          .then( function(result) {
            self.components.list = result.data;
            $location.path(`/shopping-list/${listId}`);
          })
          .catch( function(error) {
            console.log('error on getting components', error);
          });
    };
    if($routeParams.id) {
      self.getComponents($routeParams.id);
    }

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/
    self.createShoppingList = function (name, first_name, last_name) {
        let username = `${first_name} ${last_name}`;
        let shoppingListObject = {
            name,
            date: new Date(),
            user_created_by: username
        };
        $http.post('/api/shopping', shoppingListObject)
            .then((result) => {
                self.currentShoppingListId.shopId = result.data.rows[0];
            })
            .catch(function (err) {
                console.log('error in adding item', err);
            });
    }; //function to create a shopping list

    //Start of function to save shopping lists with modules
    self.saveShoppingList = function name(arrayOfModules) {
        let newShoppingListId = self.currentShoppingListId.shopId.id
        
        $http.post(`/api/shopping/shoppinglist/${newShoppingListId}`, arrayOfModules)
            .then(response => {
                self.getComponents(newShoppingListId)
                $location.path('/shopping-list');
            })
            .catch(error => {
                console.log('error in shopping list save', error);
            });
    }; //End of function to save shopping lists with modules

    self.addOrderedInHouseToComponent = function(component) {
      $http.post('/api/shopping/addOrderedInHouse/', component)
        .then( function(response) {
          self.getComponents(component.shopping_id);
        })
        .catch( function(error) {
          console.log('error adding ordered_inHouse_id to component: ', error);
        });
    };

    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/

    self.updateOrderedInHouseComponent = function(component) {
      $http.put('/api/shopping/updateOrderedInHouse', component)
      .then( function(response) {
        self.getComponents(component.shopping_id);
      })
      .catch( function(error) {
        console.log('error updating component status: ', error);
      });
    };
}]);
