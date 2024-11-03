const express = require('express');
const router = express.Router();

const {
    createCar,
    getAllCars
} = require('../controllers/cars_controller');

router.post('/create_car',createCar);
router.get('/get_all_cars', getAllCars);

module.exports = router;

