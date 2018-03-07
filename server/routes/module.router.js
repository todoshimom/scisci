const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

/******************************************/
/*              GET REQUESTS              */
/******************************************/
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM modules';
    pool.query(queryText)
        .then(result => {
            console.log('result.rows', result.rows);
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`;
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

/******************************************/
/*              PUT REQUESTS              */
/******************************************/
router.put('/', (req, res) => {
    const queryText = `UPDATE modules SET
        name = $1,
        code = $2,
        estimated_assembly_time = $3,
        version_number = $4,
        version_notes = $5,
        version_date = $6,
        module_drive_link = $7,
        to_be_printed_link = $8,
        assembly_video_link = $9,
        activity_video_link = $10,
        kit_content_link = $11,
        other1_title = $12,
        other1_link = $13,
        other2_title = $14,
        other2_link = $15,
        assembly_notes = $16
    WHERE id = $17`;
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
        req.body.assembly_notes,
        req.body.id
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
    const queryText = 'DELETE FROM modules WHERE id = $1';
    pool.query(queryText, [req.params.id])
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
