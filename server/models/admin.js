const express = require('express');

let isAdmin = function (req, res, next) {
    if (req.user.usertype === 1) {
        return next();
    }
    console.log('User is not an Admin');
    res.sendStatus(401); //Unauthorized
}

module.exports = isAdmin;