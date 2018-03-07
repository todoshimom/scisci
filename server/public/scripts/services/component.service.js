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

          // for (let component of response.data) {
          //   if(component.vendor_name_secondary == null) {
          //     component.vendor_name_secondary = '';
          //   }
          //   if(component.vendor_url_secondary == null) {
          //     component.vendor_url_secondary = '';
          //   }
          // }

          self.componentLibrary.list = response.data;
        })
        .catch( function(error) {
          console.log(error);
        });
    }; // end getComponents()

    self.getComponents();


    self.sortComponents = function(sortMethod) {
      $http.get(`/api/component/sorting/${sortMethod}`)
        .then( function(response) {
          console.log(response.data);
          self.componentLibrary.list = response.data;
        })
        .catch( function(error) {
          console.log(error);
        });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {

      $http.post('/api/component', component)
        .then( function(response) {
          console.log('Component added to library:', response);
          self.getComponents();
        })
        .catch( function(error) {
          console.log('Error on POST:', error);
        });

    }; // end addComponentToLib()

    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/

    // begin updateComponent()
    self.updateComponent = function(component) {
      $http.put(`/api/component/updateComponent`, component)
        .then( function(response) {
          console.log('Component updated', response);
          self.getComponents();
        })
        .catch( function(error) {
          console.log('Error updating component', error);
        });
    }; // end updateComponent()


    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/

    // begin deleteComponent()
    self.deleteComponent = function(componentId) {

      $http.delete(`/api/component/deleteComponent/${componentId}`)
        .then( function(response) {
          console.log('Component deleted from library', response);
          self.getComponents();
        })
        .catch( function(error) {
          console.log('Error deleting component', error);
        });

    }; // end deleteComponent()


    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/



}]);
