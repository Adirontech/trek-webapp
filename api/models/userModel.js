const db = require('../db');
const crypto = require('crypto');
const { QueryFile } = require('pg-promise');

const userQueries = {
    createUser: new QueryFile('./sql/userSQL/create.sql'),
    createUserData: new QueryFile('./sql/userDataSQL/create.sql'),
    signInUser: new QueryFile('./sql/userSQL/signIn.sql'),
};

async function createUser({username, password, first_name, last_name, address = null, city = null, state = null, zip = null, phone}) {
    const hashedPW = hashPW(password);
    result = await db.one(userQueries.createUserData, [first_name, last_name, address, city, state, zip, phone]);
    return db.one(userQueries.createUser, [username, hashedPW, result.id]);
}

async function signInUser({username, password}){
    const hashedPW = hashPW(password);
    const sessionKey = crypto.randomBytes(32).toString('hex');
    return db.one(userQueries.signInUser, [username, hashedPW, sessionKey]);
}

function hashPW(pw) {
    const hash = crypto.createHash('sha512');
    hash.update(pw)
    return hash.digest('hex');
}

module.exports = {
    createUser,
    signInUser
};