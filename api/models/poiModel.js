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
    getAll: new QueryFile(path.join(__dirname, '../sql/poiSQL/getAll.sql')),
    getTrailheads: new QueryFile(path.join(__dirname, '../sql/poiSQL/getTrailheads.sql')),
    getAllUsage: new QueryFile(path.join(__dirname, '../sql/poiSQL/allUsage.sql')),
    getAverageUsage: new QueryFile(path.join(__dirname, '../sql/poiSQL/averageUsage.sql')),
    getTotalUsage: new QueryFile(path.join(__dirname, '../sql/poiSQL/totalUsage.sql'))
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

/**
 * Gets all POI usage, grouped by day
 * @returns {PromiseObject} usage data
 */
async function getAllUsage(){
    return await db.any(poiQueries.getAllUsage);
};

/**
 * Gets total POI usage
 * @param {string} step the interval for the usage to be grouped by
 * @param {string} from the date to start getting data
 * @param {string} to the date to stop getting data
 * @param {string} types the types of POIs to get data for
 * @param {string} min the minimum usage to include
 * @param {string} max the maximum usage to include
 * @param {string} pois the points of interest ids. comma separated
 * @returns {Promise<Object>} usage data
 */
async function getTotalUsage(step, from, to, types, pois, min, max){
    return await db.any(poiQueries.getTotalUsage, [step, from, to, types, pois, min, max]);
}

/**
 * Gets average usage of specific POIs over a given time period.
 * @param {string} step the interval for the usage to be grouped by
 * @param {string} from the date to start getting data
 * @param {string} to the date to stop getting data
 * @param {string} types the types of POIs to get data for
 * @param {string} min the minimum usage to include
 * @param {string} max the maximum usage to include
 * @param {string} pois the points of interest ids. comma separated
 * @returns {Promise<Object>} average usage data
 */
async function getAverageUsage(step, from, to, types, pois, min, max){
    return await db.any(poiQueries.getAverageUsage, [step, from, to, types, pois, min, max]);
}


module.exports = {
    getAll,
    getTrailheads,
    getAllUsage,
    getTotalUsage,
    getAverageUsage
};