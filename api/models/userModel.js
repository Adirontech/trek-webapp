/**
 * userModel.js - Module for handling user-related operations.
 * This module provides functions for creating users, signing in users, and retrieving user information.
 */

// Import required modules
const db = require('../db');
const crypto = require('crypto');
const { QueryFile } = require('pg-promise');
const path = require('path');
const rangerModel = require('../models/rangerModel');

// Define queries for user operations
const userQueries = {
    createUser: new QueryFile(path.join(__dirname, '../sql/userSQL/create.sql')),
    createUserData: new QueryFile(path.join(__dirname, '../sql/userDataSQL/create.sql')),
    signInUser: new QueryFile(path.join(__dirname, '../sql/userSQL/signIn.sql')),
    getUserInfo: new QueryFile(path.join(__dirname, '../sql/userDataSQL/get.sql'))
};

/**
 * Retrieves user information based on a given session key.
 * @param {string} key - The Session key used to retrieve user information.
 * @returns {Promise<Object>} The user information.
 */
async function getUserInfo(key) { // the 'key' variable refers to a session key
    const result = await db.one(userQueries.getUserInfo, [key]);
    return result;
}

/**
 * Creates a new user and associated user data in the database.
 * @param {Object} userData - Object containing user data.
 * @returns {Promise<Object>} The newly created user.
 */
async function createUser(userData) {
    const hashedPW = hashPW(userData.password);
    const result = await db.one(userQueries.createUserData, [
        userData.first_name, userData.last_name, userData.address, userData.city, userData.state,
        userData.zip, userData.phone
    ]);
    const userResult = await db.one(userQueries.createUser, [userData.username, hashedPW, result.id]);
    if (userData.is_ranger) {
        await rangerModel.createRanger(userResult.id);
    }
    return userResult;
}

/**
 * Signs in a user with the provided username and password.
 * @param {Object} userData - Object containing user login data.
 * @returns {Promise<Object>} The signed-in user information.
 */
async function signInUser(userData) {
    const hashedPW = hashPW(userData.password);
    const sessionKey = crypto.randomBytes(32).toString('hex');
    const res = await db.one(userQueries.signInUser, [userData.username, hashedPW, sessionKey]);
    return res;
}

/**
 * Hashes the given password using SHA-512 algorithm.
 * @param {string} pw - The password to be hashed.
 * @returns {string} The hashed password.
 */
function hashPW(pw) {
    const hash = crypto.createHash('sha512');
    hash.update(pw);
    return hash.digest('hex');
}

module.exports = {
    createUser,
    signInUser,
    getUserInfo
};
