const express = require('express');

let isEditor = function (req, res, next) {
    if (req.user.usertype === 1 || req.user.usertype === 2) {
        return next();
    }
    console.log('User is not an Admin/Editor');
    res.sendStatus(401); //Unauthorized
}

module.exports = isEditor;