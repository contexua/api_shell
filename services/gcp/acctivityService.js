'use strict'

const activityService = () => {

    async getAllActivities() {
        return activities;
    }

    async recordActivity(event, userEmail) {
        activities.push({
            event,
            timestamp: new Date(),
            user: userEmail
        });
    }
}

module.exports = {activityService};