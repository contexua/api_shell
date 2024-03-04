'use strict'

const mockActivityService = require('../mock/mockActivityService');

let activityService;

module.exports.init_module = (app) => {
  switch (app.locals.ACTIVITY_SERVICE_IMPLEMENTATION) {
    case 'mock':
      activityService = mockActivityService;
      break;
    // case 'mongo':
    //   break;
    default:
      activityService = mockActivityService;
      break;
  }
  return activityService;
};
