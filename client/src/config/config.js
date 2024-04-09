const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

const url = process.env.DB_URL

module.exports = {
    apiURL: url
};