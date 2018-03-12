const express = require('express');
const pool = require('../modules/pool.js');
const sorting = require('../modules/sorting.js');
const router = express.Router();

/******************************************/
/*              GET REQUESTS              */
/******************************************/
router.get('/all', (req, res) => {
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

router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM modules WHERE modules.id = $1`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});


router.get('/sorting/:method', (req, res) => {
    let sortMethod = req.params.method;
    console.log(sortMethod);
    let queryText = sorting.sortModules(sortMethod);
    console.log(queryText);
    pool.query(queryText)
        .then((results) => {
            console.log('GET modules sorted', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on modules sorted request', error);
            res.sendStatus(500);
        });
});

router.get('/components/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    
    // get the components in a separate route
    const queryText = `SELECT * FROM components_modules
        JOIN components ON components_modules.component_id = components.id
        WHERE components_modules.module_id = $1`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('get request, result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});
 
/******************************************/
/*             POST REQUESTS              */
/******************************************/

router.post('/', (req, res) => {
    console.log('req.body', req.body);
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
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.post('/components', (req, res) => {
    console.log('req.body', req.body);
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
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

/******************************************/
/*              PUT REQUESTS              */
/******************************************/
router.put('/', (req, res) => {
    console.log(`put request
    
    `, req.body);

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
    console.log('HERE', req.body.name, req.body.id);
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
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.put('/components', (req, res) => {
    const queryText = `UPDATE components_modules SET
        pieces_per_kit = $1
    WHERE module_id = $2 AND component_id = $3`;
    console.log('HERE', req.body.name, req.body.id);
    pool.query(queryText, [
        req.body.pieces_per_kit,
        req.body.module_id,
        req.body.component_id
    ])
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

/******************************************/
/*            DELETE REQUESTS             */
/******************************************/
router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM modules WHERE module_id = $1 AND component_id = $2';
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.delete('/components/:module_id/:component_id', (req, res) => {
    console.log(`hit Delete route
    
    
    ${req.params.module_id}
    
    ${req.params.component_id}
    
    
    
    
    
    `);
    const queryText = 'DELETE FROM components_modules WHERE module_id = $1 AND component_id = $2';
    pool.query(queryText, [req.params.module_id, req.params.component_id])
        .then(result => {
            console.log('result.rows', result.rows);
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
