const express = require('express');
const router = express.Router();
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require('../controllers/company');

router.post('/create_company', createCompany);
router.get('/all_companies', getAllCompanies);
router.get('/get_company/:id', getCompanyById);
router.patch('/update_company/:id', updateCompany);
router.delete('/delete_company/:id', deleteCompany);

module.exports = router;
