/**
 * userRouter.js - Router for handling user-related routes.
 * This router handles routes for creating and signing in users.
 */

 const express = require('express'); // Importing the Express.js framework
 const router = express.Router(); // Creating a router instance
 const userModel = require('../models/userModel'); // Importing the user model for user operations
 
 /**
  * Route to handle GET requests for retrieving a user by ID.
  * @param {string} id - ID of the user to retrieve.
  * @returns {void}
  */
 router.get('/:id', (req, res, next) => {
     // This route is not implemented yet
 });
 
 /**
  * Route to handle POST requests for creating new users or signing in existing users.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.post('/', async (req, res, next) => {
     try {
         const createParams = ['username', 'password', 'first_name', 'last_name', 'phone'];
         const signInParams = ['username', 'password'];
 
         // Check for missing parameters for creating a user or signing in
         const missingCreateParams = createParams.filter(param => !(param in req.body));
         const missingSignInParams = signInParams.filter(param => !(param in req.body));
 
         if (missingCreateParams.length === 0) {
             // Create user if all required parameters are present
             const user = await userModel.createUser(req.body);
             res.status(200).json({ user_id: user.id, message: `User created successfully with id ${user.id}.` });
         } else if (missingSignInParams.length === 0) {
             // Sign in user if all required parameters are present
             const user = await userModel.signInUser(req.body);
             res.status(200).json({ session_key: user.session_key, message: "User signed in successfully." });
         } else {
             // Throw an error if both sets of required parameters are missing
             throw new Error(`Missing required parameters to sign in: ${missingSignInParams.join(', ')}. Missing required parameters to create user: ${missingCreateParams.join(', ')}`);
         }
     } catch (error) {
         // Handle errors
         res.status(400).json({ message: error.message });
     }
 });
 
 /**
  * Route to handle PUT requests for updating user information.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.put('/', (req, res, next) => {
     // This route is not implemented yet
 });
 
 /**
  * Route to handle DELETE requests for deleting a user.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Next function in the middleware chain.
  * @returns {void}
  */
 router.delete('/', (req, res, next) => {
     // This route is not implemented yet
 });
 
 // Exporting the router for use in other modules
 module.exports = router;
 