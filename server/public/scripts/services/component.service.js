myApp.service('ComponentService', ['$http', '$location', function ($http, $location) {
    let self = this;

    self.componentLibrary = {list:[]};
    self.componentModules = {list:[]};


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    /** Gets a single component */
    self.getComponents = function() {
      return $http.get('/api/component')
        .then( function(response) {
          return response.data;
        })
        .catch( function(error) {
          console.log(error);
        });

    }; // end getComponents()

    /** Gets all components */
    self.getAllComponents = function() {

      self.getComponents()
        .then( function(componentData) {
          self.componentLibrary.list = self.getModulesUsedIn(componentData);
      });

    }; // getAllComponents()

    self.getAllComponents();

    /** Gets all modules a component is used in */
    self.getModulesUsedIn = function(componentData) {
      for (let component of componentData) {
        $http.get(`/api/component/modulesCount/${component.id}`)
          .then( function(response) {
            component.modules_used_in = response.data[0].count;
          })
          .catch( function(error) {
            console.log(error);
          });
    }
    return componentData;
  };

    
    /** Sorts a single component */
    self.sortComponents = function(sortMethod) {

      return $http.get(`/api/component/sorting/${sortMethod}`)
        .then( function(response) {
          return response.data;
        })
        .catch( function(error) {
          console.log(error);
        });

    }; // end sortComponents()

    /** Sorts all components */
    self.sortAllComponents = function(sortMethod) {
      
      self.sortComponents(sortMethod)
        .then( function(response) {
          self.componentLibrary.list = self.getModulesUsedIn(response);
        });
    };

    // begin getModules()
    self.getModules = function(component) {

      return $http.get(`/api/component/getModules/${component.id}`)
        .then( function(response) {
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
          self.getAllComponents();
          swal({
            title: `${component.name} added!`,
            icon: "success",
            timer: 1200,
            buttons: false
        })
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
          self.getAllComponents();
          swal({
            title: `Component has been updated!`,
            icon: "success",
            timer: 1200,
            buttons: false
        })
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
          self.getAllComponents();
          swal({
            title: `Component removed`,
            icon: "success",
            timer: 1200,
            buttons: false
        })
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

    // for sorting modules used in on the client-side
    self.sortColumnsClientSide = function(filter) {
      self.componentLibrary.list.sort(function(a, b) {
        if (filter === 'modulesUsedInAsc') {
          return a.modules_used_in - b.modules_used_in;
        } else {
          return b.modules_used_in - a.modules_used_in;
        }
      });
    };


}]);
