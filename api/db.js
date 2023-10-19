const pgp = require("pg-promise")();
const config = require("../config/config");

const db = pgp(config.databaseURL);

module.exports = db;