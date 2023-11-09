const db = require('../db');
const { QueryFile } = require('pg-promise');

const userQueries = {
    createUser: new QueryFile('./sql/userSQL/create.sql'),
    createUserData: new QueryFile('./sql/userDataSQL/create.sql')
};

async function createUser({ username, password, first_name, last_name, address, city, state, zip, phone }) {
    result = await db.one(userQueries.createUserData, [first_name, last_name, address, city, state, zip, phone]);
    return db.one(userQueries.createUser, [username, password, result.id]);
}

module.exports = {
    createUser,
};