/**
 * trailRouter.js - Router for handling trail-related routes.
 * This router handles routes for retrieving trails.
 */

 const express = require('express'); // Importing the Express.js framework
 const router = express.Router(); // Creating a router instance
 
 /**
  * Route to handle GET requests for retrieving a specific trail by ID.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.get('/:id', (req, res, next) => {
     // Respond with the ID of the requested trail
     res.status(200).json({
         message: req.params.id
     });
 });
 
 /**
  * Route to handle GET requests for retrieving all trails.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.get('/', (req, res, next) => {
     // Respond with a message indicating retrieval of all trails
     res.status(200).json({
         message: 'trails'
     });
 });
 
 // Exporting the router for use in other modules
 module.exports = router;