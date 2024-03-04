'use strict';

const FacadeBuilder = require("../../util/FacadeBuilder");
const { getLogger } = require('../../util/logging_manager');
const logger = getLogger();

const userCRUD = (operation) => async (req, res, next) => {
    
    try {
        
        const { userId } = req.params;
        const { name, email, userType } = req.body;
        const searchCriteria = req.body;
        const msg_locale = req.msg_locale;

        const payload = {
            id: parseInt(userId, 10),
            name,
            email,
            userType,
            searchCriteria: searchCriteria,
            msg_locale,
            operator: 1
        };

        const builder = new FacadeBuilder(payload);

        await operation(builder);
        const response = builder.build();
        const statusCode = operation.name.includes('delete') ? 204 : (operation.name.includes('post') || operation.name.includes('put')) ? 201 : 200;

        logger.debug(statusCode+" "+operation.name);
        res.status(statusCode).json(response);
    } catch (error) {
        logger.debug(error);
        const response = builder.build();
        res.status(500).json(response);
    }
};

module.exports = { userCRUD };