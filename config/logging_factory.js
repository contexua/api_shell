'use strict'
// loggingFactory.js

const initLocalLogger = require('./logging_config_local');
const initGcpLogger = require('./logging_config_gcp');

const createLogger = (type, config) => {
    switch (type) {
        case 'local':
            return initLocalLogger(config);
        case 'gcp':
            return initGcpLogger(config);
        default:
            throw new Error(`Unknown logger type: ${type}`);
    }
};

module.exports = { createLogger };