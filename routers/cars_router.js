const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createCar, getAllCars } = require('../controllers/cars_controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/create_car', upload.single('image'), createCar);
router.get('/get_all_cars', getAllCars);

module.exports = router;
