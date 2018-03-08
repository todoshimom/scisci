myApp.service('ShoppingListService', ['$http', '$location', function ($http, $location) {
	console.log('ShoppingListService Loaded');
	let self = this;


	/******************************************/
	/*              GET REQUESTS              */
	/******************************************/
	self.getModules = function (keyword) {

	}

	self.getSelectedLists = function () {

	};//function to get selected lists 


	/******************************************/
	/*             POST REQUESTS              */
	/******************************************/
	self.createShoppingList = function (name, first_name, last_name) {
		var userName = `${first_name} ${last_name}`;
		let shoppingListObject = {
			name,
			date: new Date(),
			user_created_by: userName
		};
		$http.post('/api/shopping', shoppingListObject)
			.then((result) => {
				
				
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
