const Customer = require('../models/customer');
const Messages = require('../errormessages/messages');
const Review = require('../models/reviews');
const { Op } = require('sequelize');

async function createCustomer(req, res) {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).send({ message: Messages.CREATED_CUSTOMER, customer });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAllCustomers(req, res) {
    try {
        const { id } = req.query;
        const whereClause = {};

      
    
        if (id) {
            const customerIdArray = id.split(',');
            if (customerIdArray.length > 1) {
                
               
                whereClause.id = { [Op.in]: customerIdArray }; 
            } else {
                
                whereClause.id = { [Op.eq]: id };
            }
        }

        const customers = await Customer.findAll({
            where: whereClause,
            attributes: ['id', 'name'], 
        });
        res.status(200).send(customers);
    } catch (error) {

        console.log(error);
        
        res.status(500).send(error);
    }
}

async function getCustomerById(req, res) {
    try {
        const customer = await Customer.findOne({ id: req.params.id }).select('-id');
        if (!customer) {
            return res.status(404).json({ error: Messages.NOT_FOUND_CUSTOMER });
        }
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateCustomer(req, res) {
    try {
        const customer = await Customer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteCustomer(req, res) {
    try {
        const customer = await Customer.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!customer) return res.status(404).send();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
