const Order = require('../models/orders');
const Messages = require('../errormessages/messages');

async function createOrder(req, res) {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send({ message: Messages.CREATED_ORDER, order });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAllOrders(req, res) {
    try {
        const { id, customer_id, company_id, mechanic_b2b_id, status } = req.query;
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (customer_id) filter.customer_id = customer_id;
        if (company_id) filter.company_id = company_id;
        if (mechanic_b2b_id) filter.mechanic_b2b_id = mechanic_b2b_id;
        if (status) filter.status = new RegExp(status, 'i');
        
        const orders = await Order.find(filter).select('_id id customer_id company_id mechanic_b2b_id order_date status');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getOrderById(req, res) {
    try {
        const order = await Order.findOne({ id: req.params.id }).select('-id');
        if (!order) {
            return res.status(404).json({ error: Messages.NOT_FOUND_ORDER });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateOrder(req, res) {
    try {
        const order = await Order.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!order) return res.status(404).send();
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteOrder(req, res) {
    try {
        const order = await Order.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!order) return res.status(404).send();
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
