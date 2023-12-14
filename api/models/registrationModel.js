const db = require('../db');
const { QueryFile } = require('pg-promise');

const registrationQueries = {
    createRegistration: new QueryFile('./sql/registrationSQL/create.sql'),
};

function createRegistration({leader, date, start, purpose, duration, pary_size, session_key}) {
    return db.one(registrationQueries.createRegistration, [leader, date, start, purpose, duration, pary_size, session_key]);
}

module.exports = {
    createRegistration,
};