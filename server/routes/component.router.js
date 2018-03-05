const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



/******************************************/
/*              GET REQUESTS              */
/******************************************/

router.get('/', (req, res) => {

  let queryText = `SELECT * FROM components`;

  pool.query(queryText)
      .then((results) => {
        console.log('GET components', results);
        res.send(results.rows);
      })
      .catch((error) => {
        console.log('Error on GET components request', error);
      });
});


/******************************************/
/*             POST REQUESTS              */
/******************************************/

router.post('/', (req, res) => {

  if(!req.body.hasOwnProperty('vendor_name_secondary')) {
    req.body.vendor_name_secondary = null;
  }
  if(!req.body.hasOwnProperty('vendor_url_secondary')) {
    req.body.vendor_url_secondary = null;
  }

  let item = req.body;

  let queryText = `
  INSERT INTO components ("name", "description", "vendor_name_primary",
  "vendor_url_primary", "vendor_name_secondary", "vendor_url_secondary",
  "notes", "price_per_unit", "pieces_per_unit", "consumable", "type",
  "general_stock_item")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12); `;

  pool.query(queryText, [item.name, item.description, item.vendor_name_primary, item.vendor_url_primary,
  item.vendor_name_secondary, item.vendor_url_secondary, item.notes, item.price_per_unit, item.pieces_per_unit,
  item.consumable, item.type, item.general_stock_item])
      .then((results) => {
        console.log('Component insert', results);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('Error making insert', error);
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
