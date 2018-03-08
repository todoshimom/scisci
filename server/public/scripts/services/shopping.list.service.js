myApp.service('ShoppingListService', ['$http', '$location', function ($http, $location) {
    console.log('ShoppingListService Loaded');
    let self = this;


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/
    self.getModules = function(keyword) {
      
    }
    
    self.getSelectedLists = function() {

    };//function to get selected lists 
   

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
              console.log('Added item', result);
              // PUT GET REQUEST HERE TO REFRESH THE LIST
              console.log(result.data.rows[0].id);
              $http.get('/api/shopping/' + result.data.rows[0].id)
                .then((result) => {
                  console.log('get result: ', result);
                  self.ShoppingListObject = result.data.rows[0];
                  console.log(self.ShoppingListObject);
                })
              .catch(err => {
                  console.log('hit error on getting shopping list data', err);
              });
          })
          .catch(function (err) {
              console.log('error in adding item', err);
          })
  } //function to create a shopping list


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
