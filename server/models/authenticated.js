const express = require('express');

let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Failed the next of authen');
    res.sendStatus(403); //Forbiden User is not authenticated
}

module.exports = isAuthenticated;