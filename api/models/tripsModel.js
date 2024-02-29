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
    // getTrips: new QueryFile(path.join(__dirname, '../sql/tripsSQL/get.sql')),
    getTripsFromKey: new QueryFile(path.join(__dirname, '../sql/tripsSQL/getFromKey.sql')),
    createTrip: new QueryFile(path.join(__dirname, '../sql/tripsSQL/create.sql')),
    editTrip: new QueryFile(path.join(__dirname, '../sql/tripsSQL/edit.sql'))
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
 * Creates a new trip in the database.
 * @param {Object} tripData - Object containing trip data.
 * @returns {Promise<Object>} The newly created trip.
 */
async function createTrip(tripData) {
    return db.one(tripQueries.createTrip, [
        tripData.first_name, tripData.last_name, tripData.street, tripData.city, tripData.state,
        tripData.zip_code, tripData.date, tripData.start, tripData.pois, tripData.purpose,
        tripData.phone, tripData.duration, tripData.party_size, tripData.session_key
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

module.exports = {
    getAllTrips,
    getTripsFromKey,
    createTrip,
    editTrip
};
