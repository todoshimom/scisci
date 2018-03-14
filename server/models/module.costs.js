const express = require('express');
const pool = require('../modules/pool.js');
// const laborRate = require('./labor.rate')

// function test() {
        
//     console.log('new function');
    
//     laborRate()//getting labor rates.
//         .then((results) => {
//             let data = results[0].labor_rate
//             console.log('This is the data 55', data);
            
//             return data
            
//         })
//         .catch((error) => {
//             console.log('Error on retrieving module costs function', error);
//         });
//     }

let getCosts = function (moduleId) {

    // let labRate = test()
    // console.log(labRate, 'LAB RATES');
    
    let queryText

    if (moduleId) {
        console.log('Getting one');
        queryText = `
        SELECT components_modules.component_id, components_modules.module_id, components.pieces_per_unit,
        components.price_per_unit, components_modules.pieces_per_kit, appsettings.labor_rate, modules.estimated_assembly_time 
        FROM appsettings, components
        JOIN components_modules ON components.id = components_modules.component_id
        JOIN modules ON components_modules.module_id = modules.id
        WHERE components_modules.module_id = ${moduleId};`;
    }
    else {
        console.log('Getting All');

        queryText = `
        SELECT components_modules.component_id, components_modules.module_id, components.pieces_per_unit,
        components.price_per_unit, components_modules.pieces_per_kit, appsettings.labor_rate, modules.estimated_assembly_time 
        FROM appsettings, components
        JOIN components_modules ON components.id = components_modules.component_id
        JOIN modules ON components_modules.module_id = modules.id;`;
    }

    return pool.query(queryText)
        .then((results) => {
            let data = results.rows
            for (let i = 0; i < data.length; i++) {
                //If the units to order and the kit are an exact number
                if (data[i].pieces_per_unit == data[i].pieces_per_kit) {
                    data[i].material_cost = Number(data[i].price_per_unit);
                    data[i].material_kit_cost = Number(data[i].price_per_unit);
                    data[i].labor_cost = data[i].labor_rate * data[i].estimated_assembly_time;
                    data[i].material_labor_cost = data[i].material_cost + data[i].labor_cost;
                    data[i].material_kit_labor_cost = data[i].material_kit_cost + data[i].labor_cost;
                }// If the pieces to order is more than what is required in the kit.
                else if (data[i].pieces_per_unit > data[i].pieces_per_kit) {
                    data[i].material_cost = Number(data[i].price_per_unit);
                    let percent = data[i].pieces_per_kit / data[i].pieces_per_unit;
                    data[i].material_kit_cost = data[i].pieces_per_kit * (percent * data[i].price_per_unit);
                    data[i].labor_cost = data[i].labor_rate * data[i].estimated_assembly_time;
                    data[i].material_labor_cost = data[i].material_cost + data[i].labor_cost;
                    data[i].material_kit_labor_cost = data[i].material_kit_cost + data[i].labor_cost;
                }
                else {// If the pieces to order is less than what is required in the kit.
                    let divide = data[i].pieces_per_kit / data[i].pieces_per_unit;
                    data[i].material_cost = Math.ceil(divide) * data[i].price_per_unit;
                    data[i].material_kit_cost = data[i].price_per_unit * divide;
                    data[i].labor_cost = data[i].labor_rate * data[i].estimated_assembly_time;
                    data[i].material_labor_cost = data[i].material_cost + data[i].labor_cost;
                    data[i].material_kit_labor_cost = data[i].material_kit_cost + data[i].labor_cost;
                }

            }
            // console.log(data[1], 'logging sample data results');
            return data
        })
        .catch((error) => {
            console.log('Error for cost calculations request', error);
            return 500;
        });
}

module.exports = getCosts;