const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customer');

router.post('/create_customer', createCustomer);
router.get('/all_customers', getAllCustomers);
router.get('/get_customer/:id', getCustomerById);
router.patch('/update_customer/:id', updateCustomer);
router.delete('/delete_customer/:id', deleteCustomer);

module.exports = router;
