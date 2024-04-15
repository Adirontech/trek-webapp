// Use path & dotenv to ensure the API process can access root -.env variables
const path = require('path');
console.log(require('dotenv').config({path: path.resolve(__dirname, '../../.env')}));

// Grab Necessary Config Information From Root .env file
const username = process.env.DB_USERNAME // The database username
const password = process.env.DB_PASSWORD // The database password
const port = process.env.DB_PORT // The database port
const dbName = process.env.DB_NAME // The database name

// Construct the full URL using the config information
databaseURL = "postgres://" + username + ":" + password + "@localhost:" + port + "/" + dbName

// Export completed database URL
module.exports = {
    databaseURL
};