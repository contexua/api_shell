'use strict'

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('yamljs');
const express = require('express');


// This module now exports a function that accepts the app object
const docs = [
    // {
    //     yamlPath: './config/accounts-api-docs.yaml',
    //     route: '/api-docs/accounts'
    // },
    {
        yamlPath: './config/users-api-docs.yaml',
        route: '/api-docs/users'
    },
    // {
    //     yamlPath: './config/root-api-docs.yaml',
    //     route: '/api-docs/'
    // },
];

const config_swagger = async (app) => {
    
        /***
        * setup swagger for api
        ***/
        // const swaggerOptions = {
        //     definition: {
        //         openapi: '3.0.0',
        //         info: {
        //             title: 'User API',
        //             version: '1.0.0',
        //             description: 'A simple Express User API',
        //         },
        //     },
        //     apis: [
        //         './api/routes/routes_main.js',
        //         './api/routes/routes_users.js'
        //     ],
        // };
        // app.locals.SWAGGER_SPEC = swaggerJsdoc(swaggerOptions);

        // const swaggerDocument = yaml.load('./config/api-docs.yaml');
        // app.locals.SWAGGER_YAML = swaggerDocument;
    
};
const serve_swagger = (app) => {
            docs.forEach(doc => {
                const swaggerDocument = yaml.load(doc.yamlPath);
                const swaggerRouter = express.Router();
        
                swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
                app.use(doc.route, swaggerRouter);
            });
}
module.exports = {config_swagger, serve_swagger}