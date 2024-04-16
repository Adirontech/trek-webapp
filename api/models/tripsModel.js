/**
 * tripsModel.js - Module for handling trip-related operations.
 * This module provides functions for retrieving, creating, and editing trips.
 */

// Import required modules
const db = require('../db');
const { QueryFile } = require('pg-promise');
const path = require('path');

// Define queries for trip operations
const tripQueries = {
    getAllTrips: new QueryFile(path.join(__dirname, '../sql/tripsSQL/getAll.sql')),
    getTripsFromKey: new QueryFile(path.join(__dirname, '../sql/tripsSQL/getFromKey.sql')),
    getTripsInfoFromKey: new QueryFile(path.join(__dirname, '../sql/tripsSQL/getInfoFromKey.sql')),
    getTripInfoFromCodeKey: new QueryFile(path.join(__dirname, '../sql/tripsSQL/getInfoFromCodeKey.sql')),
    getTripBelongsToKey: new QueryFile(path.join(__dirname, '../sql/tripsSQL/belongsToKey.sql')),
    createTrip: new QueryFile(path.join(__dirname, '../sql/tripsSQL/create.sql')),
    editTrip: new QueryFile(path.join(__dirname, '../sql/tripsSQL/edit.sql')),
    confirmTrip: new QueryFile(path.join(__dirname, '../sql/tripsSQL/confirm.sql'))
};

/**
 * Retrieves all trips from the database.
 * @returns {Promise<Array>} An array containing all trip records.
 */
async function getAllTrips() {
    return await db.any(tripQueries.getAllTrips);
}

/**
 * Retrieves all trips from the database for a specific user (from a session key)
 */
async function getTripsFromKey(key) {
    return await db.any(tripQueries.getTripsFromKey, key);
}

/**
 * Retrieves all readable trip info from the database for a specific user (from a session key)
 */
async function getTripsInfoFromKey(key) {
    return await db.any(tripQueries.getTripsInfoFromKey, key);
}

/**
 * Retrieves readable trip info for a specific trip from the database for a specific user (from a session key and trip code)
 */
async function getTripInfoFromCodeKey(code, key) {
    return await db.one(tripQueries.getTripInfoFromCodeKey, [code, key]);
}

async function getTripBelongsToKey(code, key) {
    return await db.one(tripQueries.getTripBelongsToKey, [code, key]);
}

/**
 * Creates a new trip in the database.
 * @param {Object} tripData - Object containing trip data.
 * @returns {Promise<Object>} The newly created trip.
 */
async function createTrip(tripData) {
    let legal_chars = "ABCDEFGHJKLMNPQRTUVWXY346789";
    let confirm_code = "";
    for (let i = 0; i < 7; i++) {
        confirm_code += legal_chars[Math.floor(Math.random() * legal_chars.length)];
    }
    
    return db.one(tripQueries.createTrip, [
        tripData.first_name, tripData.last_name, tripData.street, tripData.city, tripData.state,
        tripData.zip_code, tripData.date, tripData.start, tripData.pois, tripData.purpose,
        tripData.phone, tripData.duration, tripData.party_size, tripData.session_key, confirm_code
    ]);
}

/**
 * Edits an existing trip in the database.
 * @param {Object} tripData - Object containing trip data to be edited.
 * @returns {Promise<Object>} The edited trip.
 */
async function editTrip(tripData) {
    return db.one(tripQueries.editTrip, [
        tripData.id, tripData.first_name, tripData.last_name, tripData.street, tripData.city,
        tripData.state, tripData.zip_code, tripData.date, tripData.start, tripData.pois,
        tripData.purpose, tripData.phone, tripData.duration, tripData.party_size, tripData.session_key
    ]);
}

/**
 * Confirms a trip for check-in
 */
async function confirmTrip(confirmCode) {
    return await db.one(tripQueries.confirmTrip, confirmCode);
}

module.exports = {
    getAllTrips,
    getTripsFromKey,
    getTripsInfoFromKey,
    getTripInfoFromCodeKey,
    getTripBelongsToKey,
    createTrip,
    editTrip,
    confirmTrip
};
