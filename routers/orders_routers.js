const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../controllers/orders');

router.post('/create_order', createOrder);
router.get('/all_orders', getAllOrders);
router.get('/get_order/:id', getOrderById);
router.patch('/update_order/:id', updateOrder);
router.delete('/delete_order/:id', deleteOrder);

module.exports = router;
