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
    getGroupUsage: new QueryFile(path.join(__dirname, './sql/poiSQL/groupUsageOverTime.sql')),
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


module.exports = {
    getGroupUsage
};