// Use path & dotenv to ensure the API process can access root -.env variables
const path = require('path');
console.log(require('dotenv').config({path: path.resolve(__dirname, '../../../.env')}));

// Grab Necessary Config Information From Root .env file
const url = process.env.API_URL // The API URL

// Export completed API URL
module.exports = {
    apiURL: url
};