'use strict'

const mockUserService = require('../mock/mockUserService');
const mongoUserService = require('../mongoose/mongoUserService');

let userService;

module.exports.init_module = (app) => {
  switch (app.locals.USER_SERVICE_IMPLEMENTATION) {
    case 'mock':
      userService = mockUserService;
      break;
    case 'mongo':
      userService = mongoUserService;
      break;
    default:
      userService = mongoUserService;
      break;
  }
  return userService;
};
