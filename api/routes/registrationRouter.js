const express = require('express');
const router = express.Router();
const registrationModel = require('../models/registrationModel');

router.post('/', async (req, res, next) => {
  try {
    const { data } = req.body;
    trip = await registrationModel.createRegistration(data);
    res.status(200).json(trip); 
  } catch (error) {
    next(error);
  }
});



module.exports=router