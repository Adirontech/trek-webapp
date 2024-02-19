const express = require('express');
const router = express.Router();
const poiModel = require('../models/poiModel');

router.get('/usage', async (req, res) => {
    try{
        if(req.query.pois && req.query.from && req.query.to){
            const usage = await poiModel.getGroupUsage(req.query.pois, req.query.from, req.query.to);
            res.status(200).json(usage);
        }else{
            res.send({ message: 'Not all requied query parameters (pois, from, to) were provided'});
        }
    }catch(error){
        res.send({ message: error.message });
    }
});


module.exports = router;