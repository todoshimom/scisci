myApp.service('ShoppingListService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    let self = this;

    self.shoppingLists = {list:[]};
    self.components = {list: []};
    self.currentShoppingListId = { shopId: 0 };

    self.currentSortMethod = 'vendorPrimaryAsc';

    self.totalCosts = {
      totalCost: 0,
      totalCostUnordered: 0,
      totalCostNotInHouse: 0,
    };

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

            self.sortColumnsClientSide(self.currentSortMethod);
            self.calculateCosts();

            $location.path(`/shopping-list/${listId}`);
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
                self.getComponents(newShoppingListId);
                $location.path('/shopping-list');
            })
            .catch(error => {
                console.log('error in shopping list save', error);
            });
    }; //End of function to save shopping lists with modules

    self.addOrderedInHouseCommentsComponent = function(component) {
      $http.post('/api/shopping/addOrderedInHouseComments/', component)
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

    self.updateOrderedInHouseCommentsComponent = function(component) {
      $http.put('/api/shopping/updateOrderedInHouseComments', component)
      .then( function(response) {
        self.getComponents(component.shopping_id);
      })
      .catch( function(error) {
        console.log('error updating component status: ', error);
      });
    };


    /******************************************/
    /*              OTHER FUNCTIONS           */
    /******************************************/

    // for sorting modules used in on the client-side
    self.sortColumnsClientSide = function(filter) {
      // capture the selected sort method
      self.currentSortMethod = filter;
      
      self.components.list.sort(function(a, b) {
        // sort by ordered status (Boolean)
        if (filter === 'orderedAsc') {
          return (a.ordered === b.ordered)? 0 : a.ordered? -1 : 1;
        } else if (filter === 'orderedDesc') {
          return (b.ordered === a.ordered)? 0 : b.ordered? -1 : 1;

        // sort by in-house status (boolean)
        } else if (filter === 'inHouseAsc') {
          return (a.in_house === b.in_house)? 0 : a.in_house? -1 : 1;
        } else if (filter === 'inHouseDesc') {
          return (b.in_house === a.in_house)? 0 : b.in_house? -1 : 1;

        // sort by in-house status (boolean)
        } else if (filter === 'orderQuantityAsc') {
          return a.orderQuantity > b.orderQuantity;
        } else if (filter === 'orderQuantityDesc') {
          return b.orderQuantity > a.orderQuantity;

        // sort by name (string)
        } else if (filter === 'nameAsc') {
          return a.name > b.name;
        } else if (filter === 'nameDesc') {
          return b.name > a.name;

        // sort by type (string)
        } else if (filter === 'typeAsc') {
          return a.type > b.type;
        } else if (filter === 'typeDesc') {
          return b.type > a.type;

        // sort by price (number)
        } else if (filter === 'priceAsc') {
          return a.price > b.price;
        } else if (filter === 'priceDesc') {
          return b.price > a.price;

        // sort by description (string)
        } else if (filter === 'descriptionAsc') {
          return a.description > b.description;
        } else if (filter === 'descriptionDesc') {
          return b.description > a.description;
          
        // sort by primary vendor (string)
        } else if (filter === 'vendorPrimaryAsc') {
          return a.vendor_name_primary > b.vendor_name_primary;
        } else if (filter === 'vendorPrimaryDesc') {
          return b.vendor_name_primary > a.vendor_name_primary;
        }
        
      });
    };

    // calculate prices
    self.calculateCosts = function() {
      let newTotalCost = 0;
      let newTotalCostUnordered = 0;
      let newTotalCostNotInHouse = 0;
      for (let i = 0; i < self.components.list.length; i++) {
        let pricePerUnit = Number(self.components.list[i].price_per_unit);

        // convert the price of one component to a number to two decimal places to avoid floating-point error
        let componentPrice = Math.floor(pricePerUnit * self.components.list[i].orderQuantity * 100) / 100;

        // calculate cost for everything in the list
        newTotalCost += componentPrice;

        // calculate cost for everything not ordered in the list
        if (!self.components.list[i].ordered) {
          newTotalCostUnordered += componentPrice;
        }

        // calculate cost for everything not in house
        if (!self.components.list[i].in_house) {
          newTotalCostNotInHouse += componentPrice;
        }
      }
      self.totalCosts.totalCost = newTotalCost;
      self.totalCosts.totalCostUnordered = newTotalCostUnordered;
      self.totalCosts.totalCostNotInHouse = newTotalCostNotInHouse;
    };

}]);
