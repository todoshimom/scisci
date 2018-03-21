const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const authenticated = require('../models/authenticated')
const isAdmin = require('../models/admin')
const moduleCost = require('../models/module.costs')


/******************************************/
/*              GET REQUESTS              */
/******************************************/

router.get('/modules', authenticated, isAdmin, (req, res) => { //Start of get module reports function
    moduleCost()//Getting all results.
        .then((laborCosts) => {
            for (let i = 0; i < laborCosts.length; i++) {
                laborCosts[i].totalKitSum = laborCosts[i].currentKitSum * laborCosts[i].module_quantity
                laborCosts[i].currentKitSum = laborCosts[i].currentKitSum + laborCosts[i].laborCost
                laborCosts[i].currentSum = laborCosts[i].currentSum + laborCosts[i].laborCost
                laborCosts[i].totalLaborCost = laborCosts[i].laborCost * laborCosts[i].module_quantity
                laborCosts[i].totalMatKitSum = laborCosts[i].currentKitSum * laborCosts[i].module_quantity
            }
            res.send(laborCosts);
        })
        .catch((error) => {
            console.log('Error on retrieving module costs function', error);
            res.sendStatus(501);
        });


}); //End of get module reports function


router.get('/componentOrdered/:id', (req, res) => {
  let queryText = `SELECT COUNT(component_id) FROM shopping_components WHERE component_id = $1`;

  pool.query(queryText, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});


router.get('/version', authenticated, isAdmin, (req, res) => { //Start of get module reports function
    const queryText = 'SELECT name, code, version_number, version_date FROM modules ORDER BY "version_date"';

    pool.query(queryText)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET all module versions', error);
            res.sendStatus(500);
        });
});

module.exports = router;
