/**
 * db.js - Database configuration file.
 * This file establishes a connection to the PostgreSQL database using pg-promise library.
 */

 const pgp = require("pg-promise")(); // Importing pg-promise library for interacting with PostgreSQL
 const config = require("config/config"); // Importing database configuration
 
 // Establishing a database connection using the provided database URL from the configuration
 const db = pgp(config.databaseURL);
 
 module.exports = db; // Exporting the database connection for use in other modules
 