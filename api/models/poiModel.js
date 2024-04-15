/**
 * poiModel.js - Module for handling poi-related operations.
 * This module provides functions for retrieving poi usage information.
 */

// Import required modules
const db = require('../db');
const { QueryFile } = require('pg-promise');
const path = require('path');

// Derine queries for pois
const poiQueries = {
    getGroupUsage: new QueryFile(path.join(__dirname, '../sql/poiSQL/groupUsage.sql')),
    getAll: new QueryFile(path.join(__dirname, '../sql/poiSQL/getAll.sql')),
    getTrailheads: new QueryFile(path.join(__dirname, '../sql/poiSQL/getTrailheads.sql')),
    getDailyUsage: new QueryFile(path.join(__dirname, '../sql/poiSQL/dailyUsage.sql'))
};

/**
 * Gets the number of times each POI was visited during a given time period
 * @param {string} pois the points of interest ids. comma separated
 * @param {string} from the date to start getting data
 * @param {string} to the date to stop getting data
 * @returns  {Promise<Object>} usage data
 */
async function getGroupUsage(pois, from, to){
    return await db.any(poiQueries.getGroupUsage, [pois, from, to]);
};

/**
 * Gets all POIs
 * @returns {PromiseObject} pois
 */
async function getAll(){
    return await db.any(poiQueries.getAll);
};

/**
 * Gets all trailheads (Starting Points)
 * @returns {PromiseObject} trailheads
 */
async function getTrailheads(){
    return await db.any(poiQueries.getTrailheads);
};

 /* Gets the number of times a POI was visited on a given day and the amount of visitors for that day
 * @param {string} poi the point of interest id 
 * @param {string} date the date to get data for
 * @returns {Promise<Object>} daily usage data
 */
async function getDailyUsage(poi, date){
    var result = await db.oneOrNone(poiQueries.getDailyUsage, [poi, date]);
    return result;
}

module.exports = {
    getGroupUsage,
    getAll,
    getTrailheads,
    getDailyUsage
};