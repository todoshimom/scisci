myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    let self = this;
    self.userObject = { list: [] };
    self.userLibrary = { list: [] };
    self.userTypes = { list: [] };
    self.currentLaborRate = { list: [] };

    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/

    // This is for the manage users view
    self.getAllUsers = function () { // Start of getAllUsers function.
        $http.get('/api/user/users')
            .then(function (response) {
                self.userLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for all users failed: ', error);
            });
    }; // End of getAllUsers function.

    self.getUserTypes = function () { // Start of getUserTypes function.
        $http.get('/api/user/types')
            .then(function (response) {
                self.userTypes.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for user types failed: ', error);
            });
    }; // End of getUserTypes function.

    self.sortUsers = function (sortMethod) {
        $http.get(`/api/user/sorting/${sortMethod}`)
            .then(function (response) {
                self.userLibrary.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for sort users failed: ', error);
            });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    self.addUser = function (newUser) {// Start of addUser function.
        $http.post('/api/user', newUser)
            .then(function (response) {
                self.getAllUsers();
                swal({
                    title: `The account for ${newUser.first_name} ${newUser.last_name} has been created`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                })
            })
            .catch(function (error) {
                console.log('Error on new user POST request: ', error);
            });

    }; // End of addUser function.

    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/

    self.submitEdit = function (userEdit) {

        $http.put('/api/user', userEdit)
            .then(function (response) {
                self.getAllUsers();
                swal({
                    title: `Account Edit Complete`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                })
            })
            .catch(function (error) {
                console.log('Error on edit user PUT request: ', error);
            });

    }

    self.resetPassword = function (id) {

        $http.put(`/api/user/resetPassword/${id}`)
            .then(function (response) {
                swal({
                    title: `Password Reset Complete`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                })
            })
            .catch(function (error) {
                console.log('Error on reset password PUT request: ', error);
            });

    }

    self.setNewPassword = function (newPass) {
        $http.put(`/api/user/newPassword`, newPass)
            .then(function (response) {
                swal({
                    title: `Password Update Complete`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                });
                self.userTypeHomePage(response.data);
            })
            .catch(function (error) {
                console.log('Error on set new password PUT request: ', error);
            });

    }


    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/

    self.deleteUser = function (userId) {    // Start of deleteUser function

        $http.delete(`/api/user/${userId}`)
            .then(function (response) {
                self.getAllUsers();
                swal({
                    title: `Account Deleted`,
                    icon: "success",
                    timer: 1200,
                    buttons: false
                })
            })
            .catch(function (error) {
                console.log('Error removing user: ', error);
            });

    }; // End of deleteUser function

    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/


    /************* VERIFICATION/LOGOUT FUNCTIONS *************/
    self.getuser = function (authorized, userType1, userType2) {
        $http.get('/api/user').then(function (response) {
          if (authorized) {
            if (response.data.username && response.data.usertype !=  userType1 && response.data.usertype !=  userType2) {
                // user has a current session on the server
                self.userObject.list = response.data;
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/404");
            }
          } else {
            if (response.data.username) {
                // user has a current session on the server
                self.userObject.list = response.data;
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/home");
            }
          }
        }, function (response) {
            console.log('UserService -- getuser -- failure: ', response);
            $location.path("/home");
        });
    };

    self.logout = function () {
        $http.get('/api/user/logout').then(function (response) {
            location.reload();
            $location.path("/home");
        });
    }


    /*****************  LABOR RATE GET AND POST  *****************/

    self.setLaborRate = function (rate) {// Start of set labor rate function.
        $http.put(`/api/user/set/rates/${rate}`)
            .then(function (response) {
                self.retrieveLaborRate()
            })
            .catch(function (error) {
                console.log('Post response for set labor rates failed: ', error);
            });
    }; // End of set labor rate function.

    self.retrieveLaborRate = function () {// Start of retrieveLaborRate function.
        $http.get('/api/user/laborRates')
            .then(function (response) {
                self.currentLaborRate.list = response.data;
            })
            .catch(function (error) {
                console.log('Get response for retrieve labor rates failed: ', error);
            });
    }; // End of retrieveLaborRate function.


    self.userTypeHomePage = function (user) {
      if(user.usertype === 1) {
        $location.path('/report');
      } else if (user.usertype === 2) {
        $location.path('/module-nav');
      } else {
        $location.path('/shopping-nav');
      }
    };

    self.onLoad = function () {
        self.retrieveLaborRate()
        self.getuser()
        self.getUserTypes();
        self.getAllUsers();
    }

    self.onLoad()


    /*****************  APP SETTINGS REMOVE SHOPPING LISTS  *****************/

  self.shoppingLists = {list:[]};

  self.getShoppingLists = function() {
    $http.get('/api/user/shopping')
      .then( function(response) {
        self.shoppingLists.list = response.data;
      })
      .catch( function(error) {
        console.log('Error getting shopping lists', error);
      });
  };

  self.removeList = function(item) {
    $http.delete(`/api/user/shopping/${item}`)
      .then( function(response) {
        self.getShoppingLists();
      })
      .catch( function(error) {
        console.log('Error removing shopping list', error);
      });
  };

}]);
