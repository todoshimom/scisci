myApp.service('ModuleService', ['$http', '$location', function ($http, $location) {
    console.log('ModuleService Loaded');
    let self = this;


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


    /******************************************/
    /*             POST REQUESTS              */
    /******************************************/



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
