const express = require('express');

let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();        
    }
    console.log('Failed the next of authen');
    res.sendStatus(401); //Unauthorized
  }

  module.exports = isAuthenticated;