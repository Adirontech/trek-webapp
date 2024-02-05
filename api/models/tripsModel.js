/**
 * tripsModel.js - Module for handling trip-related operations.
 * This module provides functions for retrieving, creating, and editing trips.
 */

 const db = require('../db'); // Importing the database connection module
 const { QueryFile } = require('pg-promise'); // Importing pg-promise's QueryFile class for SQL queries
 
 // Object containing prepared SQL queries for trip operations
 const tripQueries = {
     // Query to get all trips
     getAllTrips: new QueryFile('./sql/tripsSQL/getAll.sql'),
     // Query to get specific trips
     getTrips: new QueryFile('./sql/tripsSQL/get.sql'),
     // Query to create a new trip
     createTrip: new QueryFile('./sql/tripsSQL/create.sql'),
     // Query to edit an existing trip
     editTrip: new QueryFile('./sql/tripsSQL/edit.sql')
 };
 
 /**
  * Function to retrieve all trips.
  * @returns {Promise<Array>} - Promise that resolves to an array of all trips.
  */
 async function getAllTrips() {
     return await db.any(tripQueries.getAllTrips);
 }
 
 /**
  * Function to create a new trip.
  * @param {Object} tripData - Object containing trip data.
  * @param {string} tripData.leader - Leader of the trip.
  * @param {Date} tripData.date - Date of the trip.
  * @param {string} tripData.start - Starting location of the trip.
  * @param {string} tripData.purpose - Purpose of the trip.
  * @param {string} tripData.duration - Duration of the trip.
  * @param {number} tripData.party_size - Size of the party.
  * @param {string} tripData.session_key - Session key for authentication.
  * @returns {Promise<Object>} - Promise that resolves to the created trip object.
  */
 async function createTrip({leader, date, start, purpose, duration, party_size, session_key}) {
     return db.one(tripQueries.createTrip, [leader, date, start, purpose, duration, party_size, session_key]);
 }
 
 /**
  * Function to edit an existing trip.
  * @param {Object} tripData - Object containing trip data.
  * @param {number} tripData.id - ID of the trip to be edited.
  * @param {string} tripData.leader - Leader of the trip.
  * @param {Date} tripData.date - Date of the trip.
  * @param {string} tripData.start - Starting location of the trip.
  * @param {string} tripData.purpose - Purpose of the trip.
  * @param {string} tripData.duration - Duration of the trip.
  * @param {number} tripData.party_size - Size of the party.
  * @param {string} tripData.session_key - Session key for authentication.
  * @returns {Promise<Object>} - Promise that resolves to the edited trip object.
  */
 async function editTrip({id, leader, date, start, purpose, duration, party_size, session_key}) {
     return db.one(tripQueries.editTrip, [id, leader, date, start, purpose, duration, party_size, session_key]);
 }
 
 // Exporting functions for use in other modules
 module.exports = {
     getAllTrips,
     createTrip,
     editTrip
 };