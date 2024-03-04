'use strict'
const path = require('path');
const { createLogger } = require('./logging_factory');
const loggerManager = require('../util/logging_manager');

module.exports = async (app) => {

    let loggerType = app.locals.LOGGER_TYPE
    let loggerLevel = app.locals.LOGGER_LEVEL
    let loggerPathLocal = app.locals.LOGGER_PATH_LOCAL
    let loggerPathGcp = app.locals.LOGGER_PATH_GCP

    const originalPath = loggerPathLocal;
    const pathComponents = originalPath.split('/');
    const fileName = pathComponents.pop();
    pathComponents.shift(); // Removes the empty string at the start
    const directoryPath = pathComponents.join('/');

    try {

        const loggerConfig = {
            logLevel: loggerLevel,
            logPath: path.join('/', directoryPath, fileName)
            // Add any GCP specific configurations if needed
        };
        const logger = createLogger(loggerType, loggerConfig);

        loggerManager.setLogger(logger);
        // say what you configured
        logger.info(JSON.stringify(loggerConfig));

    } catch (error) {
        console.error(error);
    }
};
