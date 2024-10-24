const express = require('express');
const router = express.Router();
const {
    createService,
    getAllServices,
    updateService,
    getAllServicesandCompanies
} = require('../controllers/services');

router.post('/create_service', createService);
router.get('/all_services', getAllServices);
router.patch('/update_service/:id', updateService);
router.get('/filter_services_by_companies',getAllServicesandCompanies);

module.exports = router;
