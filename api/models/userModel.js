/**
 * userModel.js - Module for handling user-related operations.
 * This module provides functions for creating and signing in users, with hashing of passwords for security.
 */

 const db = require('../db'); // Importing the database connection module
 const crypto = require('crypto'); // Importing the crypto module for password hashing
 const { QueryFile } = require('pg-promise'); // Importing pg-promise's QueryFile class for SQL queries
 
 // Object containing prepared SQL queries for user operations
 const userQueries = {
     // Query for creating a user
     createUser: new QueryFile('./sql/userSQL/create.sql'),
     // Query for creating user data
     createUserData: new QueryFile('./sql/userDataSQL/create.sql'),
     // Query for signing in a user
     signInUser: new QueryFile('./sql/userSQL/signIn.sql'),
 };
 
 /**
  * Function to create a new user.
  * @param {Object} userData - Object containing user data.
  * @param {string} userData.username - User's username.
  * @param {string} userData.password - User's password.
  * @param {string} userData.first_name - User's first name.
  * @param {string} userData.last_name - User's last name.
  * @param {string|null} userData.address - User's address (optional, default is null).
  * @param {string|null} userData.city - User's city (optional, default is null).
  * @param {string|null} userData.state - User's state (optional, default is null).
  * @param {string|null} userData.zip - User's ZIP code (optional, default is null).
  * @param {string} userData.phone - User's phone number.
  * @returns {Promise<Object>} - Promise that resolves to the created user object.
  */
 async function createUser({username, password, first_name, last_name, address = null, city = null, state = null, zip = null, phone}) {
     // Hash the password
     const hashedPW = hashPW(password);
     // Insert user data into the database
     const result = await db.one(userQueries.createUserData, [first_name, last_name, address, city, state, zip, phone]);
     // Insert user credentials into the database
     return db.one(userQueries.createUser, [username, hashedPW, result.id]);
 }
 
 /**
  * Function to sign in a user.
  * @param {Object} credentials - Object containing user credentials.
  * @param {string} credentials.username - User's username.
  * @param {string} credentials.password - User's password.
  * @returns {Promise<Object>} - Promise that resolves to the signed-in user object.
  */
 async function signInUser({username, password}) {
     // Hash the password
     const hashedPW = hashPW(password);
     // Generate a session key
     const sessionKey = crypto.randomBytes(32).toString('hex');
     // Sign in the user by querying the database with the provided credentials
     return db.one(userQueries.signInUser, [username, hashedPW, sessionKey]);
 }
 
 /**
  * Function to hash a password using SHA-512 algorithm.
  * @param {string} pw - Plain text password to be hashed.
  * @returns {string} - Hashed password.
  */
 function hashPW(pw) {
     const hash = crypto.createHash('sha512');
     hash.update(pw);
     return hash.digest('hex');
 }
 
 // Exporting functions for use in other modules
 module.exports = {
     createUser,
     signInUser
 };
 