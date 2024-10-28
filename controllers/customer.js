const Customer = require('../models/customer');
const Messages = require('../errormessages/messages');

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
        const { id, name, cpf, phone } = req.query;
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (name) filter.name = new RegExp(name, 'i');
        if (cpf) filter.cpf = cpf;
        if (phone) filter.phone = new RegExp(phone, 'i');
        
        const customers = await Customer.find(filter).select('_id id name cpf phone');
        res.status(200).send(customers);
    } catch (error) {
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
