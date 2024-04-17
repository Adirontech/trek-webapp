/**
 * userRouter.js - Router for handling user-related routes.
 * This router handles routes for creating and signing in users.
 */

// Import required modules
const express = require('express');
const userModel = require('../models/userModel');

// Create router instance
const router = express.Router();

/**
 * Route to retrieve user information.
 */
router.get('/user-info', async (req, res, next) => {
    try {
        if (req.query.key) {
            const user = await userModel.getUserInfo(req.query.key);
            res.status(200).json({ success: true, data: user.getuserdata });
        } else {
            res.status(400).json({ success: false, message: 'No key provided' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/isAllocator', async (req, res, next) => {
    try {
        if (req.query.key) {
            const allocator = await userModel.isAllocator(req.query.key);
            if(allocator) {
                res.status(200).json({ success: true, data: allocator });
            } else {
                res.status(200).json({ success: false, data: allocator });
            }
        } else {
            res.status(400).json({ success: false, message: 'No key provided' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * Route to create a new user or sign in existing user.
 */
router.post('/', async (req, res, next) => {
    try {
        const createParams = ['username', 'password', 'first_name', 'last_name', 'phone'];
        const signInParams = ['username', 'password'];

        const missingCreateParams = createParams.filter(param => !(param in req.body));
        const missingSignInParams = signInParams.filter(param => !(param in req.body));

        if (missingCreateParams.length === 0) {
            const user = await userModel.createUser(req.body);
            res.status(200).json({ user_id: user.id, message: `User created successfully with id ${user.id}.` });
        } else if (missingSignInParams.length === 0) {
            const user = await userModel.signInUser(req.body);
            res.status(200).json({ session_key: user.session_key, message: "User signed in successfully" });
        } else {
            throw new Error("Missing required parameters to sign in: " + missingSignInParams.join(', ') +
                ". Missing required parameters to create user: " + missingCreateParams.join(', '));
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/***
 * Route to update user password
 */
router.post('/change-password', async (req, res, next) => {
    try {
        if (req.body.key && req.body.oldPassword && req.body.newPassword) {
            const result = await userModel.changePassword(req.body.key, req.body.oldPassword, req.body.newPassword);
            res.status(200).json({ success: true, message: result });
        } else {
            res.status(400).json({ success: false, message: 'Missing required parameters' });
        }
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Route to update user information.
 */
router.put('/', (req, res, next) => {
    // Implement update user logic here
});

/**
 * Route to delete user.
 */
router.delete('/', (req, res, next) => {
    // Implement delete user logic here
});

module.exports = router;
