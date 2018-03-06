myApp.controller('ModuleController', ['ModuleService', function (ModuleService) {
    console.log('ModuleController created');
    let self = this;

    // DUMMY DATA
    self.module = {};
    self.module.name = '';
    self.module.code = '';
    self.module.estimated_assembly_time = '';
    self.module.version_number = '';
    self.module.version_notes = '';
    self.module.version_date = '';
    self.module.module_drive_link = '';
    self.module.to_be_printed_link = '';
    self.module.assembly_video_link = '';
    self.module.activity_video_link = '';
    self.module.kit_content_link = '';
    self.module.other1_title = '';
    self.module.other1_link = '';
    self.module.other2_title = '';
    self.module.other2_link = '';
    self.module.assembly_notes = '';

    // CALCULATIONS
    self.calculations = {};
    self.calculations.material_cost = 0;
    self.calculations.material_in_kit_cost = 0;
    self.calculations.estimated_labor_cost = 0;
    self.calculations.materials_ordered_labor = 0;
    self.calculations.materials_in_kit_labor = 0;
    
    self.getModule = function() {
        $http.get('/api/module')
            .then(response => {
                console.log('get response', response);
                self.module = response.data;
            })
            .catch(error => {
                console.log('error in post', error);
            });
    };
    self.updateModule = function() {
        $http.put('/api/module', self.data)
            .then(response => {
                console.log('put response', response);
            })
            .catch(error => {
                console.log('error in post', error);
            });
    };

}]);
