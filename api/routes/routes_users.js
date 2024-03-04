'use strict';

const express = require('express');
const router = express.Router();
const userCtr = require('../controllers/userCtr');

module.exports = (app) => {

    userCtr.init_module(app);

    router.get('/users', userCtr.list_users);
    router.get('/users/:userId', userCtr.get_user);
    router.put('/users/:userId', userCtr.put_update_user);
    router.post('/users', userCtr.post_user);
    router.post('/users_find', userCtr.post_find_users);
    router.delete('/users/:userId', userCtr.delete_user);

    return router;
};