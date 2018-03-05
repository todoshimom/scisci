myApp.service('ComponentService', ['$http', '$location', function ($http, $location) {
    console.log('ComponentService Loaded');
    let self = this;


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/



    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {

      $http.post('/api/component', component)
        .then( function(response) {
          console.log(`Component added to library:`, response);
        })
        .catch( function(error) {
          console.log(`Error on POST:`, error);
        });

    }; // end addComponentToLib()

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
