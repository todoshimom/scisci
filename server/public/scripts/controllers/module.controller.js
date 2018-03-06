myApp.controller('ModuleController', ['ModuleService', function (ModuleService) {
    console.log('ModuleController created');
    let self = this;

    // DUMMY DATA
    self.data = {};
    self.data.name = '';
    self.data.code = '';
    self.data.estimated_assembly_time = '';
    self.data.version_number = '';
    self.data.version_notes = 'asdf';
    self.data.version_date = '';
    self.data.module_drive_link = 'asdf';
    self.data.to_be_printed_link = '';
    self.data.assembly_video_link = '';
    self.data.activity_video_link = '';
    self.data.kit_content_link = '';
    self.data.other1_title = '';
    self.data.other1_link = '';
    self.data.other2_title = '';
    self.data.other2_link = '';
    self.data.assembly_notes = '';

    // CALCULATIONS
    self.calculations = {};
    self.calculations.material_cost = 0;
    self.calculations.material_in_kit_cost = 0;
    self.calculations.estimated_labor_cost = 0;
    self.calculations.materials_ordered_labor = 0;
    self.calculations.materials_in_kit_labor = 0;
    
}]);
