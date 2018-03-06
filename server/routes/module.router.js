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
// router.post('/', (req, res) => {
//     const queryText = `INSERT INTO modules (content) VALUES ($1)`;
//     pool.query(queryText, [req.body.content])
//         .then(result => {
//             console.log('result.rows', result.rows);
//             res.send(result.rows);
//         }).catch(err => {
//             console.log('err', err);
//             res.sendStatus(500);
//         });
// });


/******************************************/
/*              PUT REQUESTS              */
/******************************************/
// router.put('/updateStatus', (req, res) => {
//     const queryText = `UPDATE modules SET status=$1 WHERE id=$2`;
//     pool.query(queryText, [req.body.status, req.body.id])
//         .then(result => {
//             console.log('result.rows', result.rows);
//             res.send(result.rows);
//         }).catch(err => {
//             console.log('err', err);
//             res.sendStatus(500);
//         });
// });


/******************************************/
/*            DELETE REQUESTS             */
/******************************************/
// router.delete('/:id', (req, res) => {
//     const queryText = 'DELETE FROM modules WHERE id = $1';
//     pool.query(queryText, [req.params.id])
//         .then(result => {
//             console.log('result.rows', result.rows);
//             res.send(result.rows);
//         }).catch(err => {
//             console.log('err', err);
//             res.sendStatus(500);
//         });
// });

/******************************************/
/*            OTHER FUNCTIONS             */
/******************************************/



module.exports = router;
