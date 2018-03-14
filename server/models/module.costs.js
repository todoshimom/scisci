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
        SELECT components_modules.component_id, components_modules.module_id, components.pieces_per_unit, components.price_per_unit, modules.name, sum(CASE WHEN modules_shopping.quantity>0 THEN modules_shopping.quantity ELSE 0 END) AS module_quantity, components_modules.pieces_per_kit, appsettings.labor_rate, modules.estimated_assembly_time 
        FROM appsettings, components
        JOIN components_modules ON components.id = components_modules.component_id
        JOIN modules ON components_modules.module_id = modules.id
        LEFT OUTER JOIN modules_shopping on modules.id = modules_shopping.module_id
        WHERE components_modules.module_id = ${moduleId}
        GROUP BY components_modules.component_id, components_modules.module_id, components.pieces_per_unit, components.price_per_unit, modules.name, components_modules.pieces_per_kit, appsettings.labor_rate, modules.estimated_assembly_time
        ORDER BY modules.name`;
    }
    else {
        console.log('Getting All');

        queryText = `
        SELECT components_modules.component_id, components_modules.module_id, components.pieces_per_unit, components.price_per_unit, modules.name, sum(CASE WHEN modules_shopping.quantity>0 THEN modules_shopping.quantity ELSE 0 END) AS module_quantity, components_modules.pieces_per_kit, appsettings.labor_rate, modules.estimated_assembly_time 
        FROM appsettings, components
        JOIN components_modules ON components.id = components_modules.component_id
        JOIN modules ON components_modules.module_id = modules.id
        LEFT OUTER JOIN modules_shopping on modules.id = modules_shopping.module_id
        GROUP BY components_modules.component_id, components_modules.module_id, components.pieces_per_unit, components.price_per_unit, modules.name, components_modules.pieces_per_kit, appsettings.labor_rate, modules.estimated_assembly_time
        ORDER BY modules.name;`;
    }

    return pool.query(queryText)
        .then((results) => {
            let data = results.rows


            let moduleArray = [];
            let currentSum = 0;
            let currentKitSum = 0;
            let module_quantity = 0;
            let laborCost = 0;
            let currentModule;

            for (let i = 0; i < data.length; i++) {
                //If the units to order and the kit are an exact number
                if (data[i].pieces_per_unit == data[i].pieces_per_kit) {
                    data[i].material_cost = Number(data[i].price_per_unit);
                    data[i].material_kit_cost = Number(data[i].price_per_unit);
                }// If the pieces to order is more than what is required in the kit.
                else if (data[i].pieces_per_unit > data[i].pieces_per_kit) {
                    data[i].material_cost = Number(data[i].price_per_unit);
                    let percent = data[i].pieces_per_kit / data[i].pieces_per_unit;
                    data[i].material_kit_cost = percent * data[i].price_per_unit;
                }
                else {// If the pieces to order is less than what is required in the kit.
                    let divide = data[i].pieces_per_kit / data[i].pieces_per_unit;
                    if (divide%1 >= 0.01) { //so that anything less is not rounded up in orders
                        data[i].material_cost = Math.ceil(divide) * data[i].price_per_unit;
                    }
                    else {
                        data[i].material_cost = Math.round(divide) * data[i].price_per_unit;
                    }
                    data[i].material_kit_cost = data[i].price_per_unit * divide;
                }

                data[i].labor_cost = data[i].labor_rate * data[i].estimated_assembly_time;

                // inside a group o fmodules
                if (currentModule === data[i].module_id) {
                    moduleArray[moduleArray.length - 1].labordata.push(data[i]);
                    // sum stuff
                    moduleArray[moduleArray.length - 1].currentSum += data[i].material_cost;
                    moduleArray[moduleArray.length - 1].currentKitSum += data[i].material_kit_cost;
                } else { // new module
                    moduleArray.push({ moduleid: data[i].module_id, currentSum: 0, currentKitSum: 0, labordata: [] });
                    currentModule = data[i].module_id;
                    moduleArray[moduleArray.length - 1].labordata.push(data[i]);
                    // sum 
                    moduleArray[moduleArray.length - 1].currentSum += data[i].material_cost;
                    // sum kit
                    moduleArray[moduleArray.length - 1].currentKitSum += data[i].material_kit_cost;
                    moduleArray[moduleArray.length - 1].laborCost = data[i].labor_rate * data[i].estimated_assembly_time;
                    moduleArray[moduleArray.length - 1].module_quantity = data[i].module_quantity;
                }
            }
            return moduleArray
        })
        .catch((error) => {
            console.log('Error for cost calculations request', error);
            return 500;
        });
}

module.exports = getCosts;