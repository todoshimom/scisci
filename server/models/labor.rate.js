const express = require('express');
const pool = require('../modules/pool.js');

function getLaborRate() {

    let queryText = `SELECT * FROM appsettings`;

    return pool.query(queryText)
        .then((results) => {
            return results.rows
        })
        .catch((error) => {
            console.log('Error on GET usertype ', error);
            return 500
        });
}


module.exports = getLaborRate;