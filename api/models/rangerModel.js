const db = require('../db');
const { QueryFile } = require('pg-promise');

const rangerQueries = {
    createRanger: new QueryFile('./sql/rangerSQL/create.sql')
};

async function createRanger(id) {
    result = await db.one(rangerQueries.createRanger, [id]);
    return result;
}

module.exports = {
    createRanger
};