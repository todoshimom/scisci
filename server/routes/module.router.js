const express = require('express');
const pool = require('../modules/pool.js');
const sorting = require('../modules/sorting.js');
const router = express.Router();
const authenticated = require('../models/authenticated')
const isEditor = require('../models/editor')
const moduleCost = require('../models/module.costs')
const convertToCsv = require('../modules/convertToCsv');

/******************************************/
/*              GET REQUESTS              */
/******************************************/
router.get('/all', authenticated, (req, res) => {
    const queryText = 'SELECT * FROM modules ORDER BY "name"';
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET modules request', error);
            res.sendStatus(500);
        });

});

router.get('/csv/module_library.csv', authenticated, (req, res) => {

    const queryText = 'SELECT * FROM modules ORDER BY "name"';
    pool.query(queryText)
        .then((results) => {
            res.send(convertToCsv(results.rows));
        })
        .catch((error) => {
            console.log('Error on GET modules request', error);
            res.sendStatus(500);
        });

});

router.get('/:id', authenticated, isEditor, (req, res) => {
    const queryText = `SELECT * FROM modules WHERE modules.id = $1`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});


router.get('/sorting/:method', authenticated, isEditor, (req, res) => {
    let sortMethod = req.params.method;
    let queryText = sorting.sortModules(sortMethod);
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on modules sorted request', error);
            res.sendStatus(500);
        });
});

router.get('/components/:id', authenticated, isEditor, (req, res) => {
    // get the components in a separate route
    const queryText = `SELECT * FROM components_modules
        JOIN components ON components_modules.component_id = components.id
        WHERE components_modules.module_id = $1`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.get('/cost/rates/:id', authenticated, isEditor, (req, res) => {
    moduleCost(req.params.id) // Getting single module results.
        .then((results) => {
            results[0].kit_and_labor_sum = results[0].currentKitSum + results[0].laborCost
            results[0].current_and_labor_sum = results[0].currentSum + results[0].laborCost
            console.log('find this', results[0])
            // To add material costs, kit costs, labor costs, etc into the database. 
            let sendResults = {id: results[0].module_id,
            material_cost: results[0].currentSum,
            material_in_kit_cost: results[0].currentKitSum,
            estimated_labor_cost: results[0].laborCost,
            materials_ordered_and_labor: results[0].current_and_labor_sum,
            materials_in_kit_and_labor: results[0].kit_and_labor_sum};
            const queryText = `UPDATE modules SET
                material_cost = ${results[0].currentSum},
                material_in_kit_cost = ${results[0].currentKitSum},
                estimated_labor_cost = ${results[0].laborCost},
                materials_ordered_and_labor = ${results[0].current_and_labor_sum},
                materials_in_kit_and_labor = ${results[0].kit_and_labor_sum}
                WHERE id = ${results[0].moduleid};`;
            pool.query(queryText)
                .then(result => {
                    console.log('stored into modules database', result)
                    res.send(sendResults)
                }).catch(err => {
                    console.log('unable to store', err);
                    res.sendStatus(500);
                });
        })
        .catch((error) => {
            console.log('Error on retrieving module costs function', error);
            res.sendStatus(501);
        });
})

/******************************************/
/*             POST REQUESTS              */
/******************************************/
router.post('/', authenticated, isEditor, (req, res) => {
    const queryText = `INSERT INTO modules (
        name,
        code,
        estimated_assembly_time,
        version_number,
        version_notes,
        version_date,
        module_drive_link,
        to_be_printed_link,
        assembly_video_link,
        activity_video_link,
        kit_content_link,
        other1_title,
        other1_link,
        other2_title,
        other2_link,
        assembly_notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id`;
    pool.query(queryText, [
        req.body.name,
        req.body.code,
        req.body.estimated_assembly_time,
        req.body.version_number,
        req.body.version_notes,
        req.body.version_date,
        req.body.module_drive_link,
        req.body.to_be_printed_link,
        req.body.assembly_video_link,
        req.body.activity_video_link,
        req.body.kit_content_link,
        req.body.other1_title,
        req.body.other1_link,
        req.body.other2_title,
        req.body.other2_link,
        req.body.assembly_notes
    ])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.post('/components', authenticated, isEditor, (req, res) => {
    const queryText = `INSERT INTO components_modules (
        module_id,
        component_id,
        pieces_per_kit
    ) VALUES ($1, $2, $3) RETURNING id`;
    pool.query(queryText, [
        req.body.module_id,
        req.body.component_id,
        req.body.pieces_per_kit
    ])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

/******************************************/
/*              PUT REQUESTS              */
/******************************************/
router.put('/', authenticated, isEditor, (req, res) => {
    const queryText = `UPDATE modules SET
        name = $2,
        code = $3,
        estimated_assembly_time = $4,
        version_number = $5,
        version_notes = $6,
        version_date = $7,
        module_drive_link = $8,
        to_be_printed_link = $9,
        assembly_video_link = $10,
        activity_video_link = $11,
        kit_content_link = $12,
        other1_title = $13,
        other1_link = $14,
        other2_title = $15,
        other2_link = $16,
        assembly_notes = $17
    WHERE id = $1`;
    pool.query(queryText, [
        req.body.id,
        req.body.name,
        req.body.code,
        req.body.estimated_assembly_time,
        req.body.version_number,
        req.body.version_notes,
        req.body.version_date,
        req.body.module_drive_link,
        req.body.to_be_printed_link,
        req.body.assembly_video_link,
        req.body.activity_video_link,
        req.body.kit_content_link,
        req.body.other1_title,
        req.body.other1_link,
        req.body.other2_title,
        req.body.other2_link,
        req.body.assembly_notes
    ])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.put('/components', authenticated, isEditor, (req, res) => {
    const queryText = `UPDATE components_modules SET
        pieces_per_kit = $1
    WHERE module_id = $2 AND component_id = $3`;
    pool.query(queryText, [
        req.body.pieces_per_kit,
        req.body.module_id,
        req.body.component_id
    ])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

/******************************************/
/*            DELETE REQUESTS             */
/******************************************/
router.delete('/:id', authenticated, isEditor, (req, res) => {
    let queryText = `DELETE FROM components_modules WHERE module_id = $1`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            let queryText = `DELETE FROM modules WHERE id = $1;`;

            pool.query(queryText, [req.params.id])
                .then((result) => {
                    res.send(result.rows);
                })
                .catch(err => {
                    console.log('err', err);
                    res.sendStatus(500);
                });
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.delete('/components/:module_id/:component_id', authenticated, isEditor, (req, res) => {
    const queryText = 'DELETE FROM components_modules WHERE module_id = $1 AND component_id = $2';
    pool.query(queryText, [req.params.module_id, req.params.component_id])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

/******************************************/
/*            OTHER FUNCTIONS             */
/******************************************/

module.exports = router;