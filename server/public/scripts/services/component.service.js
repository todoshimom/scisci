myApp.service('ComponentService', ['$http', '$location', function ($http, $location) {
    console.log('ComponentService Loaded');
    let self = this;

    self.componentLibrary = {list:[]};
    self.componentModules = {list:[]};


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    // begin getComponents()
    self.getComponents = function() {

      return $http.get('/api/component')
        .then( function(response) {
          return response.data;
        })
        .catch( function(error) {
          console.log(error);
        });

    }; // end getComponents()

    // begin getAllComponents()
    self.getAllComponents = function() {

      self.getComponents()
        .then( function(componentData) {

          for (let component of componentData) {
            $http.get(`/api/component/modulesCount/${component.id}`)
              .then( function(response) {
                component.modules_used_in = response.data[0].count;
              })
              .catch( function(error) {
                console.log(error);
              });
          }
          self.componentLibrary.list = componentData;
      });

    }; // getAllComponents()

    self.getAllComponents();

    // begin sortComponents()
    self.sortComponents = function(sortMethod) {

      $http.get(`/api/component/sorting/${sortMethod}`)
        .then( function(response) {
          console.log(response.data);
          self.componentLibrary.list = response.data;
        })
        .catch( function(error) {
          console.log(error);
        });

    }; // end sortComponents()

    // begin getModules()
    self.getModules = function(component) {

      $http.get(`/api/component/getModules/${component.id}`)
        .then( function(response) {
          console.log(response.data);
          self.componentModules.list = response.data;
        })
        .catch( function(error) {
          console.log('error', error);
        });

    }; // end getModules()


    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    // begin addComponentToLib()
    self.addComponentToLib = function(component) {

      $http.post('/api/component', component)
        .then( function(response) {
          console.log('Component added to library:', response);
          self.getAllComponents();
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
          self.getAllComponents();
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
          self.getAllComponents();
        })
        .catch( function(error) {
          swal({
            title: "Error!",
            text: `This component is currently being used in a module!
            Please remove the component from it's module(s) before deleting.`,
            icon: "error",
          });
          console.log('Error deleting component', error);
        });

    }; // end deleteComponent()


    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/



}]);
