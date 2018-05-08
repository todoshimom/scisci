const express = require('express');
const pool = require('../modules/pool.js');
const sorting = require('../modules/sorting.js');
const router = express.Router();
const authenticated = require('../models/authenticated');
const isEditor = require('../models/editor');
const convertToCsv = require('../modules/convertToCsv');

/******************************************/
/*              GET REQUESTS              */
/******************************************/

router.get('/', authenticated, isEditor, (req, res) => {
  let queryText = `SELECT * FROM components ORDER BY "name"`;
  pool.query(queryText)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log('Error on GET components request', error);
        res.sendStatus(500);
    });
});

router.get('/csv/component_library.csv', authenticated, isEditor, (req, res) => {

  let queryText = `SELECT * FROM components ORDER BY "name"`;
  pool.query(queryText)
      .then((results) => {
        res.send(convertToCsv(results.rows));
      })
      .catch((error) => {
        console.log('Error on GET components request', error);
        res.sendStatus(500);
    });
});

router.get('/sorting/:method', authenticated, isEditor, (req, res) => {
  let sortMethod = req.params.method;
  let queryText = sorting.sortComponents(sortMethod);
  pool.query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error on components sorted request', error);
      res.sendStatus(500);
  });
});

router.get('/modulesCount/:id', authenticated, isEditor, (req, res) => {
  let queryText = `SELECT COUNT ("component_id") FROM components_modules WHERE "component_id" = $1`;
  pool.query(queryText, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});


router.get('/getModules/:id', authenticated, isEditor, (req, res) => {
  let queryText = `
  SELECT modules.id, modules.name, components_modules.component_id
  FROM components_modules
  JOIN modules ON components_modules.module_id = modules.id
  WHERE components_modules.component_id = $1`;

  pool.query(queryText,[req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error getting component modules', error);
      res.sendStatus(500);
    });
});


/******************************************/
/*             POST REQUESTS              */
/******************************************/

router.post('/', authenticated, isEditor, (req, res) => {
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
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  pool.query(queryText, [item.name, item.description, item.vendor_name_primary, item.vendor_url_primary,
  item.vendor_name_secondary, item.vendor_url_secondary, item.notes, item.price_per_unit, item.pieces_per_unit,
  item.consumable, item.type, item.general_stock_item])
      .then((results) => {
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

router.put('/updateComponent', authenticated, isEditor, (req, res) => {

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

router.delete('/deleteComponent/:id', authenticated, isEditor, (req, res) => {
  let id = req.params.id;
  let queryText = `DELETE FROM components WHERE id = $1`;
  pool.query(queryText, [id])
      .then((results) => {
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
