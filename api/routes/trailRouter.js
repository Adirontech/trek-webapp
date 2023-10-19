const express = require('express');
const router = express.Router();

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: req.params.id
    });
});

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'trails'
    });
});

module.exports=router