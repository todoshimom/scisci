myApp.service('ShoppingListService', ['$http', '$location', function ($http, $location) {
    console.log('ShoppingListService Loaded');
    let self = this;


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/
    self.getSelectedLists = function() {

    };//function to get selected lists 
   

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/
    self.createShoppingList = function(name) {
            console.log(name);
            $http.post('/api/shopping', { name })
              .then((result) => {
                console.log('Added item');
                // PUT GET REQUEST HERE TO REFRESH THE LIST
              })
              .catch(function(err) {
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
