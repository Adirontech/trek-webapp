const express = require('express');
const router = express.Router();
const tripsModel = require('../models/tripsModel');

router.get('/all', async (req, res) => {
    const trips = await tripsModel.getAllTrips();
    res.status(200).json(trips);
});

router.post('/', async (req, res, next) => {
  try {
    const requiredCreateParams = ['first_name', 'last_name', 'street', 'city', 'state', 'zip_code', 'date', 'start', 'pois', 'duration', 'party_size', 'session_key'];

    const missingCreateParams = requiredCreateParams.filter(param => !(param in req.body));
    if(missingCreateParams.length == 0){
      console.log(req.body);
      trip = await tripsModel.createTrip(req.body);
      res.status(200).json({message: "Trip Created"});
    }else{
      throw new Error("Missing required parameters to create a trip: " + missingCreateParams.join(', '));
    }
  } catch (error) {
        res.send({ message: error.message });
  }
});

router.put('/', async (req, res, next) => {
    try {
        const requiredEditParams = ['id', 'first_name', 'last_name', 'street', 'city', 'state', 'zip_code', 'date', 'start', 'pois', 'duration', 'party_size', 'session_key'];

        const missingEditParams = requiredEditParams.filter(param => !(param in req.body));
        if(missingEditParams.length == 0){
            await tripsModel.editTrip(req.body);
            res.status(200).json({message: "Trip Updated"});
        }else{
            throw new Error("Missing required parameters to edit a trip: " + missingEditParams.join(', '));
        }
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;
