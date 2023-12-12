const db = require('../db');
const { QueryFile } = require('pg-promise');

const tripQueries = {
    getAllTrips: new QueryFile('./sql/tripsSQL/getAll.sql'),
    getTrips: new QueryFile('./sql/tripsSQL/get.sql'),
};

async function getAllTrips() {
    return await db.any(tripQueries.getAllTrips);
}

module.exports = {
    getAllTrips,
};