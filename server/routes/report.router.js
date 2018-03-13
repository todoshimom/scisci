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
        .then((results) => {
            res.send(results)
        })
        .catch((error) => {
            console.log('Error on retrieving module costs function', error);
            res.sendStatus(501);
        });


}); //End of get module reports function

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
