const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



/******************************************/
/*              GET REQUESTS              */
/******************************************/



/******************************************/
/*             POST REQUESTS              */
/******************************************/
router.post('/', (req, res) => {
    let queryString = 'INSERT INTO shopping_list (name) VALUES ($1)';
    console.log(req.body.name);
    pool.query(queryString, [req.body.name])
        .then(result => {
            console.log('query results', result);
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('hit error on posting of new Item', err);
            res.sendStatus(500);
        });
});


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
