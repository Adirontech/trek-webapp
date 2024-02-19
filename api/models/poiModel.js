const db = require('../db');
const { QueryFile } = require('pg-promise');

const poiQueries = {
    getGroupUsage: new QueryFile('./sql/poiSQL/groupUsageOverTime.sql'),
};

async function getGroupUsage(pois, from, to){
    return await db.any(poiQueries.getGroupUsage, [pois, from, to]);
};


module.exports = {
    getGroupUsage
};