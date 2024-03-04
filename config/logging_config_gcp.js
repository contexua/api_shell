'use strict'

const {Logging} = require('@google-cloud/logging');

const initGcpLogger = (config) => {
  const logging = new Logging({
    projectId: config.projectId,

  });

  const logName = config.logName || 'my-log';
  const log = logging.log(logName);

  const gcpLogger = {
    info: (message) => {
      const metadata = {severity: 'INFO'};
      const entry = log.entry(metadata, {message});
      log.write(entry).catch(console.error);
    },
    error: (message) => {
      const metadata = {severity: 'ERROR'};
      const entry = log.entry(metadata, {message});
      log.write(entry).catch(console.error);
    },

  };

  return gcpLogger;
};

module.exports = initGcpLogger;

