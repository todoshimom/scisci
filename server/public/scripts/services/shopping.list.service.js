myApp.service('ShoppingListService', ['$http', '$location', function ($http, $location) {
    console.log('ShoppingListService Loaded');
    let self = this;

    self.shoppingLists = {list:[{}]};
    self.components = {list: [{}]};
    self.currentShoppingListId = {};

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
    //function to get components for the shopping list selected
    self.getComponents = function(listId) {
        $http.get(`/api/shopping/components/${listId}`)
          .then( function(result) {
            self.components.list = result.data;
            console.log('components.list: ', self.components.list);

          })
          .catch( function(error) {
            console.log('error on getting components', error);
          });
    };

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
                console.log(self.currentShoppingListId.shopId);
            })
            .catch(function (err) {
                console.log('error in adding item', err);
            });
    }; //function to create a shopping list


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
            });
    }; //End of function to save shopping lists with modules

    self.addOrderedInHouseToComponent = function(component) {
      $http.post('/api/shopping/addOrderedInHouse/', component)
        .then( function(response) {
          console.log(response.data);
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
        console.log(response.data);
        self.getComponents(component.shopping_id);
      })
      .catch( function(error) {
        console.log('error updating component status: ', error);
      });
    };

    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/



    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/



}]);
