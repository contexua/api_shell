'use strict';

const fs = require('fs').promises;
const dotenv = require('dotenv');

module.exports = async (app) => {
    dotenv.config({
        path: `./env/.env.${process.env.NODE_ENV || 'lh'}`
    });

    const locales = process.env.LOCALES_SERVER_DEFINED || 'en,fr,es';
    const adminIpsPath = process.env.ADMIN_IPS || './env/admin_ips.json';
    const adminIpsCheck = process.env.ADMIN_IPS_CHECK || "false";
    const adminHostsPath = process.env.ADMIN_HOSTS || './env/admin_hosts.json';
    const adminHostsCheck = process.env.ADMIN_HOSTS_CHECK || "false";
    const userService = process.env.USER_SERVICE_IMPLEMENTATION || "mock";
    const activityService = process.env.ACTIVITY_SERVICE_IMPLEMENTATION || "mock";

    app.locals.LOGGER_TYPE = process.env.LOGGER_TYPE || 'local'
    app.locals.LOGGER_LEVEL = process.env.LOGGER_LEVEL || 'debug'
    app.locals.LOGGER_PATH_LOCAL = process.env.LOGGER_PATH_LOCAL || '/var/logs/contexua/v2_admin_api.log'
    app.locals.LOGGER_PATH_GCP = process.env.LOGGER_PATH_GCP 

    app.locals.LOCALES_SERVER_DEFINED = locales.split(',');
    app.locals.ADMIN_HOSTS_CHECK = adminHostsCheck;
    app.locals.ADMIN_IPS_CHECK = adminIpsCheck;
    app.locals.USER_SERVICE_IMPLEMENTATION = userService;
    app.locals.ACTIVITY_SERVICE_IMPLEMENTATION = activityService;

    try {
        const adminHostsData = await fs.readFile(adminHostsPath, 'utf8');
        app.locals.ADMIN_HOSTS_ARRAY = JSON.parse(adminHostsData);
    } catch (error) {
        console.error(`Failed to read or parse ${adminHostsPath}:`, error);

        app.locals.ADMIN_HOSTS_ARRAY = [];
    }
    try {
        const adminIpsData = await fs.readFile(adminIpsPath, 'utf8');
        app.locals.ADMIN_IPS_ARRAY = JSON.parse(adminIpsData);
    } catch (error) {
        console.error(`Failed to read or parse ${adminIpsPath}:`, error);

        app.locals.ADMIN_IPS_ARRAY = [];
    }
    // say what you configured
    console.log(app.locals);
};
