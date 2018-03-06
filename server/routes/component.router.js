const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



/******************************************/
/*              GET REQUESTS              */
/******************************************/

router.get('/', (req, res) => {

  let queryText = `SELECT * FROM components ORDER BY "name"`;

  pool.query(queryText)
    .then((results) => {
      console.log('GET components', results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error on GET components request', error);
      res.sendStatus(500);
  });
});

router.get('/sorting/:method', (req, res) => {

  let sort = req.params.method;

  console.log(sort);

  let queryText;

  switch (sort) {
    case 'nameAsc':
      queryText = `SELECT * FROM components ORDER BY "name"`;
      break;
    case 'nameDesc':
      queryText = `SELECT * FROM components ORDER BY "name" DESC`;
      break;
    case 'typeAsc':
      queryText = `SELECT * FROM components ORDER BY "type"`;
      break;
    case 'typeDesc':
      queryText = `SELECT * FROM components ORDER BY "type" DESC`;
      break;
    case 'pricePUAsc':
      queryText = `SELECT * FROM components ORDER BY "price_per_unit"`;
      break;
    case 'pricePUDesc':
      queryText = `SELECT * FROM components ORDER BY "price_per_unit" DESC`;
      break;
    case 'piecesPUAsc':
      queryText = `SELECT * FROM components ORDER BY "pieces_per_unit"`;
      break;
    case 'piecesPUDesc':
      queryText = `SELECT * FROM components ORDER BY "pieces_per_unit" DESC`;
      break;
    case 'consumableAsc':
      queryText = `SELECT * FROM components ORDER BY "consumable"`;
      break;
    case 'consumableDesc':
      queryText = `SELECT * FROM components ORDER BY "consumable" DESC`;
      break;
    case 'genStockAsc':
      queryText = `SELECT * FROM components ORDER BY "general_stock_item"`;
      break;
    case 'genStockDesc':
      queryText = `SELECT * FROM components ORDER BY "general_stock_item" DESC`;
      break;
  }

  console.log(queryText);
  pool.query(queryText)
    .then((results) => {
      console.log('GET components sorted', results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error on components sorted request', error);
      res.sendStatus(500);
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

router.put('/updateComponent', (req, res) => {

  if(req.body.vendor_name_secondary == '') {
    req.body.vendor_name_secondary = null;
  }
  if(req.body.vendor_url_secondary == '') {
    req.body.vendor_url_secondary = null;
  }

  let item = req.body;

  let queryText = `
      UPDATE components SET "name" = $1, "description" = $2, "vendor_name_primary"= $3,
      "vendor_url_primary" = $4, "vendor_name_secondary" = $5, "vendor_url_secondary" = $6,
      "notes" = $7, "price_per_unit" = $8 , "pieces_per_unit" = $9, "consumable" = $10,
      "type" = $11 , "general_stock_item" = $12
      WHERE "id" = $13 `;

    pool.query(queryText, [item.name, item.description, item.vendor_name_primary, item.vendor_url_primary,
    item.vendor_name_secondary, item.vendor_url_secondary, item.notes, item.price_per_unit, item.pieces_per_unit,
    item.consumable, item.type, item.general_stock_item, item.id])
      .then((results) => {
        console.log('Component updated', results);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('Error updating component', error);
        res.sendStatus(500);
      });
});

/******************************************/
/*            DELETE REQUESTS             */
/******************************************/

router.delete('/deleteComponent/:id', (req, res) => {

  let id = req.params.id;

  let queryText = `DELETE FROM components WHERE id = $1`;

  pool.query(queryText, [id])
      .then((results) => {
        console.log('Component delelted', results);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error deleting component');
        res.sendStatus(500);
      });
});




/******************************************/
/*            OTHER FUNCTIONS             */
/******************************************/



module.exports = router;
