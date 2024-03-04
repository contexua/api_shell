// loggerManager.js

'use strict'

let logger = null;

const setLogger = (loggerInstance) => {
    logger = loggerInstance;
};

const getLogger = () => {
    if (!logger) {
        throw new Error('Logger has not been initialized.');
    }
    return logger;
};

module.exports = { setLogger, getLogger };
