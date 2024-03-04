'use strict'

/***
 * contract for activityService - not implemented
 */
class IActivityService {

    async getAllActivities() { throw new Error("Not implemented"); }
    async recordActivity(event, userEmail) { throw new Error("Not implemented"); }
}
module.exports = IActivityService;