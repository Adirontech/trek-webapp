const db = require('../db');
const { QueryFile } = require('pg-promise');

const userQueries = {
    createUser: new QueryFile('../sql/userSQL/create.sql'),
};

function createUser(data) {
    return db.one(userQueries.createUser, [data]);
}

module.exports = {
    createUser,
};