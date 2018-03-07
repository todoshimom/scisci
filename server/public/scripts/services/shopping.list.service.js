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
    self.addShoppingList = function(list) {

    };//function to get made list to table
     
    self.createShoppingList = function(listItem) {
            console.log(listItem);
            $http.post('/api/shopping')
              .then(function(response) {
                console.log('Added item', response);
                // PUT GET REQUEST HERE TO REFRESH THE LIST
                self.listItem = '';
              })
              .catch(function(err) {
                console.log('error in adding item', err);
              })
    } //function to save shopping list


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
