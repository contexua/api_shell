'use strict';
const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', (req, res) => {
        res.status(200).send('Welcome you 😊');
    });
    router.get('/hello', (req, res) => {
        res.json({ message: 'Hello, world!' });
    });
    return router;
};