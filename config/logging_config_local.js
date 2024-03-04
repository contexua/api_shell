'use strict'
// winstonLogger.js

const winston = require('winston');

const initLocalLogger = (config) => {
  return winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
      new winston.transports.File({ filename: config.logPath }),
    ],
  });
};

module.exports = initLocalLogger;
