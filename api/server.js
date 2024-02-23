/**
 * server.js - Express server setup and configuration.
 * This file configures an Express server with middleware, routes, error handling, and starts listening on a specified port.
 */

 const cors = require("cors"); // Importing CORS middleware for enabling cross-origin resource sharing
 const morgan = require("morgan"); // Importing Morgan middleware for logging HTTP requests
 const express = require("express"); // Importing Express framework
 const app = express(); // Creating an Express application instance
 const bodyParser = require('body-parser'); // Importing body-parser middleware for parsing request bodies
 const userRoutes = require('./routes/userRouter'); // Importing user routes
 const trailRoutes = require('./routes/trailRouter'); // Importing trail routes
 const tripsRoutes = require('./routes/tripsRouter'); // Importing trips routes
 const poiRoutes = require('./routes/poiRouter'); // Import poi routes

 
 app.use(cors()); // Enabling CORS for all routes
 app.use(morgan('dev')); // Logging HTTP requests in the console with 'dev' format
 app.use(bodyParser.json()); // Parsing JSON request bodies
 app.use(bodyParser.urlencoded({extended: false})); // Parsing URL-encoded request bodies
 
 // Middleware for handling user-related routes
 app.use('/user', userRoutes);
 // Middleware for handling trail-related routes
 app.use('/trail', trailRoutes);
 // Middleware for handling trips-related routes
 app.use('/trips', tripsRoutes);
 // Middleware for handling poi-related routes
 app.use('/poi', poiRoutes);
 
 // Middleware for handling 404 errors (route not found)
 app.use((req, res, next) => {
     const error = new Error('Not found');
     error.status = 404;
     next(error);
 });
 
 // Middleware for handling other errors (internal server errors)
 app.use((error, req, res, next) => {
     res.status(error.status || 500); // Setting the response status code
     res.json({
         error: {
             message: error.message // Sending error message in JSON response
         }
     });
 });
 
 const PORT = process.env.PORT || 5000; // Setting the port number for the server
 
 // Starting the server and listening on the specified port
 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`); // Logging a message indicating the server is running
 });
 
