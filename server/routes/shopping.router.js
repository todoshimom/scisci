const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



/******************************************/
/*              GET REQUESTS              */
/******************************************/
router.get('/:id', (req, res) => {
    console.log('in the get route', req.params.id);
    let queryString = 'SELECT id FROM shopping_list WHERE id = $1';
    pool.query(queryString, [req.params.id])
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log('hit error on getting object', err);
            res.sendStatus(500);
        });
})//end get


/******************************************/
/*             POST REQUESTS              */
/******************************************/
router.post('/', (req, res) => {
    let queryString = 'INSERT INTO shopping_list (name, date, user_created_by) VALUES ($1, $2, $3) RETURNING id';
    console.log('result log', req.body);
    pool.query(queryString, [req.body.name, req.body.date, req.body.user_created_by])
        .then(result => {
            // console.log('query results', result);
            res.send(result);
        })//end then 
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
