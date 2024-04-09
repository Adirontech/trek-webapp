const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME


databaseURL = "postgres://" + username + ":" + password + "@localhost:" + port + "/" + dbName

module.exports = {
    databaseURL
};