const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();


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


router.get('/users', (req, res) => { //Start of get all users function

    let queryText = `SELECT * FROM users`;

    pool.query(queryText)
        .then((results) => {
            console.log('GET all users: ', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET user request', error);
            res.sendStatus(500);
        });

}); //End of get all users function

router.get('/types', (req, res) => {//Start of get user_types function

    let queryText = `SELECT * FROM user_type`;

    pool.query(queryText)
        .then((results) => {
            console.log('GET user_types: ', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on GET user_type ', error);
            res.sendStatus(500);
        });

});//End of get user_types function

/******************************************/
/*             POST ROUTES                */
/******************************************/

router.post('/', (req, res) => {//Start of post new user function

    let user = req.body;

    let queryText = `
    INSERT INTO users (first_name, last_name, username, user_type)
    VALUES ('$1', '$2', '$3', $4);`;

    pool.query(queryText, [user.first_name, user.last_name, user.username, user.user_type])
        .then((results) => {
            console.log('Registered user successfully: ', results);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error registering user: ', error);
            res.sendStatus(500);
        });
});//End of post new user function

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/password', (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    let saveUser = {
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password)
    };

    console.log('new user:', saveUser);
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
        [saveUser.username, saveUser.password], (err, result) => {
            if (err) {
                console.log("Error inserting data: ", err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
});

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



/******************************************/
/*            DELETE ROUTES               */
/******************************************/



/******************************************/
/*                OTHERS                  */
/******************************************/




module.exports = router;
