const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();
const sorting = require('../modules/sorting.js');
const authenticated = require('../models/authenticated')
const isAdmin = require('../models/admin')


/******************************************/
/*              GET ROUTES                */
/******************************************/

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database        
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
});


// clear all server session information about this user
router.get('/logout', (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});


router.get('/users', authenticated, isAdmin, (req, res) => { //Start of get all users function

    let queryText = `
    SELECT users.first_name, users.last_name, users.username, usertype.name, users.usertype, users.id
    FROM users
    JOIN usertype ON users.usertype = usertype.id
    ORDER BY first_name;`;

    pool.query(queryText)
        .then((results) => {
            // console.log('GET all users: ', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET user request', error);
            res.sendStatus(500);
        });

}); //End of get all users function

router.get('/types', authenticated, isAdmin, (req, res) => {//Start of get usertypes function

    let queryText = `SELECT * FROM usertype`;

    pool.query(queryText)
        .then((results) => {
            // console.log('GET usertypes: ', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET usertype ', error);
            res.sendStatus(500);
        });

});//End of get usertypes function

router.get('/sorting/:method', authenticated, isAdmin, (req, res) => {//Start of sort users function

    let queryText = sorting.sortUsers(req.params.method);

    pool.query(queryText)
        .then((results) => {
            // console.log('GET users sorted', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET request to sort users ', error);
            res.sendStatus(500);
        });
});//End of sort users function

/******************************************/
/*             POST ROUTES                */
/******************************************/

router.post('/', authenticated, isAdmin, (req, res) => {//Start of post new user function

    let user = req.body;
    console.log(user);

    let queryText = `
    INSERT INTO users (first_name, last_name, username, usertype)
    VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, [user.first_name, user.last_name, user.username, user.usertype])
        .then((results) => {
            // console.log('Registered user successfully: ', results);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error registering user: ', error);
            res.sendStatus(500);
        });

});//End of post new user function

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});


/******************************************/
/*              PUT ROUTES                */
/******************************************/

router.put('/', authenticated, isAdmin, (req, res) => {//Start of edit user function PUT REQUEST

    let user = req.body;
    console.log(user);

    let queryText = `
    UPDATE users 
    SET 
    first_name = $1,
    last_name = $2,
    username = $3,
    usertype = $4
    WHERE "id" = $5;`;

    pool.query(queryText, [user.first_name, user.last_name, user.username, user.usertype, user.id])
        .then((results) => {
            // console.log('Edited user successfully: ', results);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error Editing user: ', error);
            res.sendStatus(500);
        });

});//End of edit user function PUT REQUEST

router.put('/newPassword', authenticated, (req, res) => {//Start of resetPassword route

    console.log(req.body.password);
    let newPassword = encryptLib.encryptPassword(req.body.password);

    let queryText = `
    UPDATE users 
    SET 
    password = '${newPassword}'
    WHERE "id" = ${req.user.id};`;

    pool.query(queryText)
        .then((results) => {
            // console.log('Password has been Reset!: ', results);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error resetting password!: ', error);
            res.sendStatus(500);
        });

});//End of resetPassword route 

router.put('/resetPassword/:id', authenticated, isAdmin, (req, res) => {//Start of resetPassword route

    //Mental note, this area and resetPassword can be refactored.

    //This way the .env password can be set on heroku for easy management. 
    let resetPassword = encryptLib.encryptPassword(process.env.DEFAULTPASSWORD);

    let queryText = `
    UPDATE users 
    SET 
    password = '${resetPassword}'
    WHERE "id" = ${req.params.id};`;

    pool.query(queryText)
        .then((results) => {
            // console.log('Password has been Reset!: ', results);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error resetting password!: ', error);
            res.sendStatus(500);
        });

});//End of resetPassword route 

/******************************************/
/*            DELETE ROUTES               */
/******************************************/

router.delete('/:id', authenticated, isAdmin, (req, res) => {

    let queryText = `DELETE FROM users WHERE id = ${req.params.id}`;

    pool.query(queryText)
        .then((results) => {
            //   console.log('Successfully removed user: ', results);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error removing user: ', error);
            res.sendStatus(500);
        });

});

/******************************************/
/*                OTHERS                  */
/******************************************/

/********** LABOR RATE ROUTES ************/

router.get('/laborRates', authenticated, isAdmin, (req, res) => {//Start of get usertypes function

    let queryText = `SELECT * FROM appsettings`;

    pool.query(queryText)
        .then((results) => {
            // console.log('GET usertypes: ', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET usertype ', error);
            res.sendStatus(500);
        });

});//End of get usertypes function

router.put('/set/rates/:rate', authenticated, isAdmin, (req, res) => {//Start of post new user function

    console.log(req.params.rate);

    let queryText = `
    UPDATE appsettings
    SET 
    labor_rate = ${req.params.rate},
    last_changed = '${req.user.first_name} ${req.user.last_name}'
    WHERE id = 1;`

    pool.query(queryText)
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error updating rates: ', error);
            res.sendStatus(500);
        });

});//End of post new user function

module.exports = router;
