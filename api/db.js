/**
 * db.js - Module for connecting to the PostgreSQL database.
 * This module initializes a connection to the PostgreSQL database using pg-promise library.
 * It imports the database configuration from the config module and establishes a connection
 * using the provided database URL.
 */

 const pgp = require("pg-promise")(); // Importing pg-promise library
 const config = require("./config/config"); // Importing database configuration
 
 // Establishing a connection to the PostgreSQL database using the provided database URL
 const db = pgp(config.databaseURL);
 
 module.exports = db; // Exporting the database connection for use in other modules
 