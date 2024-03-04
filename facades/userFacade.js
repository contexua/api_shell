'use strict';

const translationService = require('../util/TranslationService');
const userServiceFactory = require("../services/factories/userServiceFactory");
const activityServiceFactory = require("../services/factories/activityServiceFactory");
const { getLogger } = require('../util/logging_manager');

// Module-level variables
let initialised = false;
let userService;
let activityService;
const logger = getLogger();

/**
 * Handles successful operations by setting the appropriate response on the builder.
 * @param {Object} builder - The builder object for constructing responses.
 * @param {Object} data - The data to be returned in the response.
 * @param {string} msg_key - The key for the success message.
 * @param {string} msg_locale - The locale for message translation.
 * @param {Object} [additionalData={}] - Additional data for message formatting.
 * @returns {Object} The updated builder object.
 */
const return_success = (builder, data, msg_key, msg_locale, additionalData = {}) => {

    logger.debug(msg_key);
    builder.setResponseData(data);
    builder.setStatus('success');
    builder.setMessage(translationService.translate(msg_key, msg_locale, additionalData));
    return builder;
};
/**
 * Handles errors by logging and setting the error response on the builder.
 * @param {Error} error - The error that occurred.
 * @param {Object} builder - The builder object for constructing responses.
 * @param {string} msg_locale - The locale for message translation.
 * @returns {Object} The updated builder object with error information.
 */
const return_error = (error, builder, msg_locale) => {

    logger.info(error.message);
    builder.setStatus('error');
    builder.setMessage(translationService.translate(error.message, msg_locale));
    return builder
}
// Higher-order function for error handling
/**
 * Wraps an operation in a try-catch block for standardized error handling.
 * @param {Function} operation - The operation to wrap.
 * @returns {Function} A function that executes the operation with error handling.
 */
const withTryCatch = (operation) => async (builder) => {
    const { msg_locale } = builder.payload;
    try {
        return await operation(builder);
    } catch (error) {
        return return_error(error, builder, msg_locale);
    }
};
/************************************************************************************/

const list_users_func = async (builder) => {

        const { msg_locale } = builder.payload;
        // Assuming userService.listAllUsers() returns an array of user objects
        const users = await userService.listAllUsers();
        if (!users || users.length === 0) {
            throw new Error('users_not_found');
        }
        return_success(builder, users, 'users_found', msg_locale, { VAR_COUNT: users.length });        
}

const get_user_func = async (builder) => {

        const { id , msg_locale } = builder.payload;
        const user = await userService.findUserById(id);
        if (!user) {
            throw new Error('user_not_found');
        }
        return_success(builder, user, 'user_found', msg_locale, {});
}

const put_update_user_func = async (builder) => {

        const { id, name, email, userType, msg_locale, operator } = builder.payload;

        const adminUser = await userService.findUserById(operator);
        if (!adminUser || adminUser.userType !== 'admin') {
            throw new Error('user_unauthorised');
        }

        const updatedUser = await userService.updateUser(id, name, email, userType);
        if (!updatedUser) {
            throw new Error('user_not_found');
        }

        await activityService.recordActivity('user_updated',operator);
        logger.debug(JSON.stringify(await activityService.getAllActivities()));

        return_success(builder, updatedUser, 'user_updated', msg_locale, {});
        
}

const post_user_func = async (builder) => {

        const { name, email, userType, msg_locale, operator } = builder.payload;
        const adminUser = await userService.findUserById(operator);
        if (!adminUser || adminUser.userType !== 'admin') {
            throw new Error('user_unauthorised');
        }

        const newUser = await userService.createUser(name, email, userType);
        if (!newUser) {
            throw new Error('user_creation_failed');
        }

        await activityService.recordActivity('user_created',operator);
        logger.debug(JSON.stringify(await activityService.getAllActivities()));

        return_success(builder, newUser, 'user_created', msg_locale, { VAR_EMAIL: newUser.email });

}
const delete_user_func = async (builder) => {

        const { id, msg_locale, operator } = builder.payload;
        const adminUser = await userService.findUserById(operator);
        if (!adminUser || adminUser.userType !== 'admin') {
            throw new Error('user_unauthorised');
        }

        const deletionResult = await userService.deleteUser(id);
        if (!deletionResult) {
            throw new Error('user_not_found');
        }

        await activityService.recordActivity('user_deleted',operator);
        logger.debug(JSON.stringify(await activityService.getAllActivities()));

        return_success(builder, { message: `User with ID ${id} deleted successfully.` }, 'user_deleted', msg_locale, {});
}
const post_find_users_func = async (builder) => {

        const { searchCriteria, msg_locale } = builder.payload;
        const users = await userService.searchUsers(searchCriteria); // Implement this method in your userService
        if (!users.length) {
            throw new Error('users_not_found');
        }
        return_success(builder, users, 'users_found', msg_locale, { VAR_COUNT: users.length });
}
/************************************************************************************/
const list_users = withTryCatch(list_users_func);
const get_user = withTryCatch(get_user_func);
const put_update_user = withTryCatch(put_update_user_func);
const post_user = withTryCatch(post_user_func);
const delete_user = withTryCatch(delete_user_func);
const post_find_users = withTryCatch(post_find_users_func);
/************************************************************************************
 * 
 * node initialises on the first reference to a require.
 * any module level variables need to be set only once.
 * a bit like a singleton, but not.
 * 
 ***********************************************************************************/
const init_module = (app) => {
    if (!initialised) {

        console.log('userFacade initialising : ');
        userService = userServiceFactory.init_module(app);
        activityService = activityServiceFactory.init_module(app);

        initialised = true;
    } else {

        console.log('userFacade already intialised : ');

    }
}
/************************************************************************************/
module.exports = {
  init_module,
  get_user,
  put_update_user,
  list_users,
  post_user,
  delete_user,
  post_find_users
};
/************************************************************************************/
// {
//     "user_found": "User found for query.",
//     "user_not_found": "User not found for query.",
//     "user_unauthorised": "User unauthorised to perform task.",
//     "user_updated": "User updated.",
//     "users_not_found" :"No users found for query.",
//     "users_found": "VAR_COUNT users found for query.",
//     "user_creation_failed": "VAR_EMAIL could not create user.",
//     "user_created": "VAR_EMAIL user created.",
//      "user_deleted": "User deleted."
// }
