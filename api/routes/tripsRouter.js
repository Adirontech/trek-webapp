const express = require('express');
const router = express.Router();
const tripsModel = require('../models/tripsModel');

router.get('/all', async (req, res) => {
    const trips = await tripsModel.getAllTrips();
    res.status(200).json(trips);
});

module.exports = router;
