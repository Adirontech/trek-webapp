const express = require('express');
const router = express.Router();
const registrationModel = require('../models/registrationModel');

router.post('/', async (req, res, next) => {
  try {
    const createParams = ['leader', 'date', 'start', 'purpose', 'duration', 'party_size', 'session_key'];

    const missingCreateParams = createParams.filter(param => !(param in req.body));
    if(missingCreateParams.length == 0){
      console.log(req.body);
      trip = await registrationModel.createRegistration(req.body);
      res.status(200).json({message: "Trip Created"});
    }else{
      throw new Error("Missing required parameters to create a trip: " + missingCreateParams.join(', '));
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});



module.exports=router