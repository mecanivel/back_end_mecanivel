const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require('../controllers/company');

const storage = multer.memoryStorage();
const upload = multer({storage , 
    limits: { fileSize: 100 * 1024 * 1024 }
})

router.post('/create_company', upload.single('image') ,createCompany);
router.get('/all_companies', getAllCompanies);
router.get('/get_company/:id', getCompanyById);
router.patch('/update_company/:id', updateCompany);
router.delete('/delete_company/:id', deleteCompany);

module.exports = router;
