const express = require('express');
const pool = require('../modules/pool.js');

let getCosts = function (moduleId) {

    let queryText

    if (moduleId) {
        console.log('Getting one');
        queryText = `
        SELECT components_modules.component_id, components_modules.module_id, components.pieces_per_unit,
        components.price_per_unit, components_modules.pieces_per_kit 
        FROM components
        JOIN components_modules ON components.id = components_modules.component_id;
        WHERE components_modules.module_id = ${moduleId}`;
    }
    else {
        console.log('I AM REALLY Getting All');
        
        queryText = `
        SELECT components_modules.component_id, components_modules.module_id, components.pieces_per_unit,
        components.price_per_unit, components_modules.pieces_per_kit 
        FROM components
        JOIN components_modules ON components.id = components_modules.component_id;`;
    }

    return pool.query(queryText)
        .then((results) => {
            let data = results.rows
            for (let i = 0; i < data.length; i++) {
                //If the units to order and the kit are an exact number
                if (data[i].pieces_per_unit == data[i].pieces_per_kit) {
                    data[i].material_cost = data[i].price_per_unit;
                    data[i].material_kit_cost = data[i].price_per_unit;
                }// If the pieces to order is more than what is required in the kit.
                else if (data[i].pieces_per_unit > data[i].pieces_per_kit) {
                    data[i].material_cost = data[i].price_per_unit;
                    let percent = data[i].pieces_per_kit / data[i].pieces_per_unit
                    data[i].material_kit_cost = data[i].pieces_per_kit * (percent * data[i].price_per_unit)
                }
                else {// If the pieces to order is less than what is required in the kit.
                    let divide = data[i].pieces_per_kit / data[i].pieces_per_unit
                    data[i].material_cost = Math.ceil(divide) * data[i].price_per_unit
                    data[i].material_kit_cost = data[i].pieces_per_kit * (data[i].price_per_unit * Math.ceil(divide))
                }

            }
            return data            
        })
        .catch((error) => {
            console.log('Error on GET user request', error);
            return 500;
        });
}

module.exports = getCosts;