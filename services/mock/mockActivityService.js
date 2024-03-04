'use strict'

const activities = [];


    const getAllActivities =  async () => {
        return activities;
    }

    const recordActivity =  async (event, operator) => {
        activities.push({
            event,
            timestamp: new Date(),
            operator: operator
        });
    }

module.exports = {getAllActivities, recordActivity};