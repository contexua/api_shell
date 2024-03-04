'use strict';

const express = require('express');
const router = express.Router();
const userCtr = require('../controllers/userCtr');

module.exports = (app) => {

    router.get('/accounts/:userId', userCtr.get_user);
    router.put('/accounts/:userId', userCtr.get_user);
    return router;
};