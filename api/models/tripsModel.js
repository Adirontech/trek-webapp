const db = require('../db');
const { QueryFile } = require('pg-promise');

const tripQueries = {
    getAllTrips: new QueryFile('./sql/tripsSQL/getAll.sql'),
    getTrips: new QueryFile('./sql/tripsSQL/get.sql'),
    createTrip: new QueryFile('./sql/tripsSQL/create.sql'),
    editTrip: new QueryFile('./sql/tripsSQL/edit.sql')
};

async function getAllTrips() {
    return await db.any(tripQueries.getAllTrips);
}

async function createTrip({first_name, last_name, street, city, state, zip_code, date, start, pois, purpose, phone, duration, party_size, session_key}) {
    return db.one(tripQueries.createTrip, [first_name, last_name, street, city, state, zip_code, date, start, pois, purpose, phone, duration, party_size, session_key]);
}

async function editTrip({id, first_name, last_name, street, city, state, zip_code, date, start, pois, purpose, phone, duration, party_size, session_key}) {
    return db.one(tripQueries.editTrip, [id, first_name, last_name, street, city, state, zip_code, date, start, pois, purpose, phone, duration, party_size, session_key]);
}

module.exports = {
    getAllTrips,
    createTrip,
    editTrip
};