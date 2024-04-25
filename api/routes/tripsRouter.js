/**
 * tripsRouter.js - Router for handling trip-related routes.
 * This router handles routes for retrieving all trips, creating new trips, and editing existing trips.
 */

// Import required modules
const express = require('express');
const tripsModel = require('../models/tripsModel');

// Create router instance
const router = express.Router();

/**
 * Route to retrieve all trips.
 */
router.get('/all', async (req, res) => {
    try {
        const trips = await tripsModel.getAllTrips();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Route to get all trips for a specific user (from a session key)
 */
router.get('/from-key', async (req, res) => {
    try {
        const trips = await tripsModel.getTripsFromKey(req.query.key);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Route to get all trip information for a specific user (from a session key)
 */
router.get('/info-from-key', async (req, res) => {
    try {
        const trips = await tripsModel.getTripsInfoFromKey(req.query.key);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Route to get specific trip information for a specific user (from a session key and trip code)
 */
router.get('/info-from-code-key', async (req, res) => {
    try {
        const trips = await tripsModel.getTripInfoFromCodeKey(req.query.code, req.query.key);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/belongs-to-key', async (req, res) => {
    try {
        const trips = await tripsModel.getTripBelongsToKey(req.query.code, req.query.key);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/check-in', async (req, res) => {
    try {
        const response = await tripsModel.confirmTrip(req.body.confirm_code);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Route to create a new trip.
 */
router.post('/', async (req, res, next) => {
    try {
        const requiredCreateParams = ['first_name', 'last_name', 'street', 'city', 'state', 'zip_code', 'date', 'start', 'pois', 'duration', 'party_size', 'session_key'];
        
        const missingCreateParams = requiredCreateParams.filter(param => !(param in req.body));
        if (missingCreateParams.length === 0) {
            const trip = await tripsModel.createTrip(req.body);
            res.status(200).json({ message: "Trip Created", trip });
        } else {
            throw new Error("Missing required parameters to create a trip: " + missingCreateParams.join(', '));
        }
    } catch (error) {
        next(error);
    }
});

/**
 * Route to edit an existing trip.
 */
router.put('/', async (req, res, next) => {
    try {
        const requiredEditParams = ['confirm_code', 'first_name', 'last_name', 'street', 'city', 'state', 'zip_code', 'date', 'start', 'pois', 'duration', 'party_size', 'session_key'];

        const missingEditParams = requiredEditParams.filter(param => !(param in req.body));
        if (missingEditParams.length === 0) {
            await tripsModel.editTrip(req.body);
            res.status(200).json({ message: "Trip Updated" });
        } else {
            throw new Error("Missing required parameters to edit a trip: " + missingEditParams.join(', '));
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
