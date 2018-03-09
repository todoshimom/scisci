const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



/******************************************/
/*              GET REQUESTS              */
/******************************************/
router.get('/all', (req, res) => {
    const queryText = 'SELECT * FROM shopping_list ORDER BY "name"';
    
    pool.query(queryText)
        .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error on GET shopping_list request', error);
        res.sendStatus(500);
    });

});

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

router.get('/components', (req, res) => {
    console.log('in the get route',);
    let queryString = `SELECT components.*
    FROM modules_shopping 
    JOIN modules ON modules.id = modules_shopping.id
    JOIN components_modules ON modules.id = components_modules.id
    JOIN components ON components.id = components_modules.id
    `;
    pool.query(queryString)
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
            let queryString = `
            SELECT id 
            FROM shopping_list
            WHERE name = '${req.body.name}';`
            pool.query(queryString)
                .then(result => {
                    console.log('shopping list id results', result);
                    res.send(result);
                })
                .catch(err => {
                    console.log('hit error on posting of new Item', err);
                    res.sendStatus(500);
                });
        })//end then 
        .catch(err => {
            console.log('hit error on posting of new Item', err);
            res.sendStatus(500);
        });
});


router.post('/shoppinglist/:id', (req, res) => {  //Start of add shoppinglist junction function


    let shoppinglistId = req.params.id
    let modulesAdded = req.body
    console.log('Shopping Id: ', shoppinglistId);
    console.log('Modules added: ', modulesAdded);


    for (let i = 0; i < modulesAdded.length; i++) {
        let queryText = `
            INSERT INTO modules_shopping (shopping_id, module_id, quantity)
            VALUES (${shoppinglistId}, ${modulesAdded[i].id}, ${modulesAdded[i].quantity});`;

        pool.query(queryText)
            .then((results) => {
                // console.log('Registered user successfully: ', results);
                console.log('Registered one module! Next please!');
            })
            .catch((error) => {
                console.log('Error registering user: ', error);
            });
    }

    res.sendStatus(200);

});  //End of add shoppinglist junction function 

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
