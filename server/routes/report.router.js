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
            // const queryText = `
            // SELECT modules.name, modules.id, sum(modules_shopping.quantity)
            // FROM modules
            // JOIN modules_shopping ON modules.id = modules_shopping.module_id
            // GROUP BY modules.name, modules.id`;
            // pool.query(queryText)
            //     .then((results) => {
            //         for (let i = 0; i < results.rows.length; i++) {
            //             for (let j = 0; j < laborCosts.length; j++) {
            //                 if (laborCosts[j].module_id === results.rows[i].id) {
            //                     laborCosts[j].module_name = results.rows[i].name;
            //                     laborCosts[j].module_times_used = results.rows[i].sum;
            //                     laborCosts[j].total_mikalc = laborCosts[j].material_kit_labor_cost * results.rows[i].sum
            //                 }
            //             }
            //         }
            //         res.send(laborCosts);
            //     })
            //     .catch((error) => {
            //         console.log('Error on GET modules request', error);
            //         res.sendStatus(500);
            //     });
            for (let i = 0; i < laborCosts.length; i++) {
                laborCosts[i].totalKitSum = laborCosts[i].currentKitSum * laborCosts[i].module_quantity
                laborCosts[i].currentKitSum = laborCosts[i].currentKitSum + laborCosts[i].laborCost
                laborCosts[i].currentSum = laborCosts[i].currentSum + laborCosts[i].laborCost
            }
            res.send(laborCosts);
        })
        .catch((error) => {
            console.log('Error on retrieving module costs function', error);
            res.sendStatus(501);
        });


}); //End of get module reports function





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
