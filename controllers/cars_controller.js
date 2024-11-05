const { Op } = require('sequelize');
const Messages = require('../errormessages/messages');
const Cars = require('../models/cars');




async function createCar(req, res) {
    try {
        const { car_name, kms_driven, pneu_status, oil_status, brake_pads_status, customer_id } = req.body;

        const carData = {
            car_name,
            kms_driven,
            pneu_status,
            oil_status,
            brake_pads_status,
            customer_id,
        };

       
        if (req.file) {
            carData.image = req.file.buffer;  
        }

        const car = await Cars.create(carData);
        res.status(201).send({ message: Messages.SUCCESSFULL_REGISTER });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}


async function getAllCars(req, res) {
    try {
        const { customer_id } = req.query;
        const whereClause = {};

        if(customer_id){
            whereClause.customer_id = { [Op.eq] : customer_id};    
        }
        const cars = await Cars.findAll({
            where:whereClause,
            attributes:['id','car_name','kms_driven','pneu_status','oil_status','brake_pads_status','image','customer_id']
        })
        res.status(200).send(cars);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    createCar,
    getAllCars
}