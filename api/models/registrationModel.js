const db = require('../db');
const { QueryFile } = require('pg-promise');

const registrationQueries = {
    createRegistration: new QueryFile('../sql/registrationSQL/create.sql'),
};

function createRegistration(data) {
    return db.one(registrationQueries.createRegistration, [data]);
}

module.exports = {
    createRegistration,
};