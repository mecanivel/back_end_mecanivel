const express = require('express');
const router = express.Router();

const {
    createCar
} = require('../controllers/cars_controller');

router.post('/create_car',createCar);


module.exports = router;

