const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const authenticated = require('../models/authenticated')
const isEditor = require('../models/editor')



/******************************************/
/*              GET REQUESTS              */
/******************************************/
router.get('/all', (req, res) => {
    const queryText = 'SELECT * FROM modules';
    
    pool.query(queryText)
        .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error on GET modules request', error);
        res.sendStatus(500);
    });

});
router.get('/components', (req, res) => {
    const queryText = 'SELECT * FROM components';
    
    pool.query(queryText)
        .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error on GET components request', error);
        res.sendStatus(500);
    });

});

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



module.exports = router;
