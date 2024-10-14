const express = require('express');
const router = express.Router();
const {
    createMechanicB2B,
    getAllMechanicsB2B,
    getMechanicB2BById,
    updateMechanicB2B,
    deleteMechanicB2B
} = require('../controllers/mechanic_b2b');

router.post('/create_mechanic_b2b', createMechanicB2B);
router.get('/all_mechanics_b2b', getAllMechanicsB2B);
router.get('/get_mechanic_b2b/:id', getMechanicB2BById);
router.patch('/update_mechanic_b2b/:id', updateMechanicB2B);
router.delete('/delete_mechanic_b2b/:id', deleteMechanicB2B);

module.exports = router;
