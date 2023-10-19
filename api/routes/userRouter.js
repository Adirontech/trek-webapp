const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');


router.get('/:id', (req, res, next) => {

});

router.post('/', async (req, res, next) => {
    try {
        const {data} = req.body;
        user = await userModel.createUser(data);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports=router