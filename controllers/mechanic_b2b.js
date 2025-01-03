const MechanicB2B = require('../models/mechanic_b2b');
const Messages = require('../errormessages/messages');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


async function createMechanicB2B(req, res) {
    try {
        const mechanic_b2b = await MechanicB2B.create(req.body);
        res.status(201).send({ message: Messages.CREATED_CUSTOMER, mechanic_b2b });
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

async function getAllMechanicsB2B(req, res) {
    try {
        const { id } = req.query;
        const whereClause = {};
        if(id){
            whereClause.id = {[Op.eq] : id };
        } 

        const mechanics = await MechanicB2B.findAll({
            where: whereClause,
            attributes:['id','name','company_id']
        });

        res.status(200).send(mechanics);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getMechanicB2BById(req, res) {
    try {
        const mechanic_b2b = await MechanicB2B.findOne({ id: req.params.id }).select('-id');
        if (!mechanic_b2b) {
            return res.status(404).json({ error: Messages.NOT_FOUND_MECHANIC_B2B });
        }
        res.status(200).send(mechanic_b2b);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateMechanicB2B(req, res) {
    try {
        const { id } = req.params;
        const [updatedRows, [updatedMechanic]] = await MechanicB2B.update(req.body, {
            where: { id },
            returning: true, 
        });

        if (updatedRows === 0) {
            return res.status(404).send({ message: "Mecânico não encontrado." });
        }
        
        res.status(200).send(updatedMechanic);
    } catch (error) {
        res.status(400).send(error);
    }
}


async function deleteMechanicB2B(req, res) {
    try {
        const mechanic_b2b = await MechanicB2B.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!mechanic_b2b) return res.status(404).send();
        res.status(200).send(mechanic_b2b);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createMechanicB2B,
    getAllMechanicsB2B,
    getMechanicB2BById,
    updateMechanicB2B,
    deleteMechanicB2B
};
