myApp.service('ComponentService', ['$http', '$location', function ($http, $location) {
    console.log('ComponentService Loaded');
    let self = this;

    self.componentLibrary = {list:[]};


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    // begin getComponents()
    self.getComponents = function() {
      $http.get('/api/component')
        .then( function(response) {
          console.log(response.data);
          self.componentLibrary.list = response.data;
        })
        .catch( function(error) {
          console.log(error);
        });
    }; // end getComponents()

    self.getComponents();

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {

      $http.post('/api/component', component)
        .then( function(response) {
          console.log(`Component added to library:`, response);
          self.getComponents();
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
