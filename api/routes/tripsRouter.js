/**
 * tripsRouter.js - Router for handling trip-related routes.
 * This router handles routes for retrieving all trips, creating new trips, and editing existing trips.
 */

 const express = require('express'); // Importing the Express.js framework
 const router = express.Router(); // Creating a router instance
 const tripsModel = require('../models/tripsModel'); // Importing the trips model for trip operations
 
 /**
  * Route to handle GET requests for retrieving all trips.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @returns {void}
  */
 router.get('/all', async (req, res) => {
     // Retrieve all trips and send them as JSON response
     const trips = await tripsModel.getAllTrips();
     res.status(200).json(trips);
 });
 
 /**
  * Route to handle POST requests for creating a new trip.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.post('/', async (req, res, next) => {
     try {
         const createParams = ['leader', 'date', 'start', 'purpose', 'duration', 'party_size', 'session_key'];
 
         // Check for missing parameters for creating a trip
         const missingCreateParams = createParams.filter(param => !(param in req.body));
         if (missingCreateParams.length === 0) {
             // Create trip if all required parameters are present
             await tripsModel.createTrip(req.body);
             res.status(200).json({ message: "Trip Created" });
         } else {
             // Throw an error if required parameters are missing
             throw new Error("Missing required parameters to create a trip: " + missingCreateParams.join(', '));
         }
     } catch (error) {
         // Handle errors
         res.status(400).json({ message: error.message });
     }
 });
 
 /**
  * Route to handle PUT requests for editing an existing trip.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.put('/', async (req, res, next) => {
     try {
         const editParams = ['id', 'leader', 'date', 'start', 'purpose', 'duration', 'party_size', 'session_key'];
 
         // Check for missing parameters for editing a trip
         const missingEditParams = editParams.filter(param => !(param in req.body));
         if (missingEditParams.length === 0) {
             // Edit trip if all required parameters are present
             await tripsModel.editTrip(req.body);
             res.status(200).json({ message: "Trip Updated" });
         } else {
             // Throw an error if required parameters are missing
             throw new Error("Missing required parameters to edit a trip: " + missingEditParams.join(', '));
         }
     } catch (error) {
         // Handle errors
         res.status(400).json({ message: error.message });
     }
 });
 
 // Exporting the router for use in other modules
 module.exports = router;