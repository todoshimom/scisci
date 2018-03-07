myApp.service('ModuleService', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {
    console.log('ModuleService Loaded');
    let self = this;

    self.module = {};

    self.moduleLibrary = {list:[
        {
            id: 1,
            name: "ONE module name",
            code: "e05",
            version_number: "1",
            version_date: "2018/01/01",
            version_notes: "these are some version notes",
            estimated_assembly_time: 1,
            assembly_notes: "these are some assembly notes",
            module_drive_link: "www.link.com",
            module_drive_title: "link title",
            to_be_printed_link: "www.link.com",
            to_be_printed_title: "link title",
            assembly_video_link: "www.link.com",
            assembly_video_title: "link title",
            activity_video_link: "www.link.com",
            activity_video_title: "link title",
            kit_content_link: "www.link.com",
            kit_content_title: "link title",
            other1_link: "www.link.com",
            other1_title: "link title",
            other2_link: "www.link.com",
            other2_title: "link title"
        },
        {
            id: 2,
            name: "TWO module name 2",
            code: "e05",
            version_number: "2",
            version_date: "2018/01/01",
            version_notes: "these are some version notes",
            estimated_assembly_time: 2,
            assembly_notes: "these are some assembly notes",
            module_drive_link: "www.link.com",
            module_drive_title: "link title",
            to_be_printed_link: "www.link.com",
            to_be_printed_title: "link title",
            assembly_video_link: "www.link.com",
            assembly_video_title: "link title",
            activity_video_link: "www.link.com",
            activity_video_title: "link title",
            kit_content_link: "www.link.com",
            kit_content_title: "link title",
            other1_link: "www.link.com",
            other1_title: "link title",
            other2_link: "www.link.com",
            other2_title: "link title"
        }
    ]};


    /******************************************/
    /*              GET REQUESTS              */
    /******************************************/
    // get all modules
    self.getModules = function() {
        // get the modules
        console.log('modules got with a get');
        
    };


    self.getModule = function() {
        $http.get('/api/module/' + $routeParams.id)
            .then(response => {
                console.log('get response', response);
                self.module.data = response.data[0];
            })
            .catch(error => {
                console.log('error in get', error);
            });
    };

    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/

    self.createModule = function() {
        $http.post('/api/module', self.module.data)
            .then(response => {
                console.log('self.module.data', self.module.data);
                console.log('post response', response);
            })
            .catch(error => {
                console.log('error in post', error);
            });
    };


    /******************************************/
    /*              PUT REQUESTS              */
    /******************************************/

    self.updateModule = function() {
        $http.put('/api/module', self.module.data)
            .then(response => {
                console.log(self.module.data);
                console.log('put response', response);
            })
            .catch(error => {
                console.log('error in put', error);
            });
    };


    /******************************************/
    /*            DELETE REQUESTS             */
    /******************************************/

    self.deleteModule = function() {
        $http.delete('/api/module/' + self.module.data.id)
            .then(response => {
                console.log('delete response', response);
            })
            .catch(error => {
                console.log('error in delete', error);
            });
    };


    /******************************************/
    /*            OTHER FUNCTIONS             */
    /******************************************/

    // CALCULATIONS
    self.calculations = {};
    self.calculations.material_cost = 0;
    self.calculations.material_in_kit_cost = 0;
    self.calculations.estimated_labor_cost = 0;
    self.calculations.materials_ordered_labor = 0;
    self.calculations.materials_in_kit_labor = 0;
    
    // Initialize page: blank item if old, get item if new
    // TODO: Check if the $routeParams is a valid ID (integer)
    self.initializeData = function() {
        if ($routeParams.id) {
            self.getModule();
        } else {
            self.module.data = {};
        }
    }
    // TODO: Show 404 if no results come back


}]);
