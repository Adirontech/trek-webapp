const db = require('../db');
const { QueryFile } = require('pg-promise');

const tripQueries = {
    getUsageBasic: new QueryFile('./sql/tripsSQL/getUsageBasic.sql'),
    getAllTrips: new QueryFile('./sql/tripsSQL/getAll.sql'),
    getTrips: new QueryFile('./sql/tripsSQL/get.sql'),
    createTrip: new QueryFile('./sql/tripsSQL/create.sql'),
    editTrip: new QueryFile('./sql/tripsSQL/edit.sql')
};

async function getUsageBasic() {
    return await db.any(tripQueries.getUsageBasic);
}

async function getAllTrips() {
    return await db.any(tripQueries.getAllTrips);
}

async function createTrip({leader, date, start, purpose, duration, party_size, session_key}) {
    return db.one(tripQueries.createTrip, [leader, date, start, purpose, duration, party_size, session_key]);
}

async function editTrip({id, leader, date, start, purpose, duration, party_size, session_key}) {
    return db.one(tripQueries.editTrip, [id, leader, date, start, purpose, duration, party_size, session_key]);
}

module.exports = {
    getAllTrips,
    getUsageBasic,
    createTrip,
    editTrip
};