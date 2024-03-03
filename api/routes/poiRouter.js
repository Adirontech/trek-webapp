/**
 * poiRouter.js - Router for handling poi-related routes.
 * This router handles routes for retrieving poi data
 */

// Import required modules
const express = require('express');
const router = express.Router();
const poiModel = require('../models/poiModel');

/**
 * Route to retrieve poi(s) usage over time
 */
router.get('/usage', async (req, res) => {
    try{
        if(req.query.pois && req.query.from && req.query.to){
            const usage = await poiModel.getGroupUsage(req.query.pois, req.query.from, req.query.to);
            res.status(200).json(usage);
        }else{
            res.send({ message: 'Not all requied query parameters (pois, from, to) were provided'});
        }
    }catch(error){
        res.status(500).send({ message: error.message });
    }
});

/**
 * Route to retrieve POIs
 */
router.get('/', async (req, res) => {
    try{
        const pois = await poiModel.getAll();
        res.status(200).json(pois);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
});

 * Route to retrieve poi usage on a certain day
 */
router.get('/daily', async (req, res) => {
    try {
        if (req.query.poi && req.query.date) {
            const usage = await poiModel.getDailyUsage(req.query.poi, req.query.date);
            res.status(200).json(usage);
        }
        else {
            res.send({ message: 'Not all requied query parameters (poi, date) were provided' });
        
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Route to retrieve Trailheads (Starting Points)
 */
router.get('/trailhead', async (req, res) => {
    try{
        const trailheads = await poiModel.getTrailheads();
        res.status(200).json(trailheads);
    }catch(error){


module.exports = router;