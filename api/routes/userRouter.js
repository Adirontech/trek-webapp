const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');


router.get('/:id', (req, res, next) => {

});

router.post('/', async (req, res, next) => {
    try {
        const {data} = req.body;

        const requiredParams = ['username', 'password', 'first_name', 'last_name', 'phone'];
        const missingRequiredParams = requiredParams.filter(param => !(param in req.body));

        if (missingRequiredParams.length > 0) {
            throw new Error("Missing required user parameters: " + missingRequiredParams.join(', '));
        }

        user = await userModel.createUser(req.body);
        res.status(200).json({ user_id: user.id, message: "User created successfully with id " + user.id + "." });
    } catch (error) {
        next(error);
    }
});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports=router