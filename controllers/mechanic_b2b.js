const MechanicB2B = require('../models/mechanic_b2b');
const Messages = require('../errormessages/messages');

async function createMechanicB2B(req, res) {
    try {
        const mechanic_b2b = new MechanicB2B(req.body);
        await mechanic_b2b.save();
        res.status(201).send({ message: Messages.CREATED_MECHANIC_B2B, mechanic_b2b });
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

async function getAllMechanicsB2B(req, res) {
    try {
        const { id, name, cpf, phone, company_id } = req.query;
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (name) filter.name = new RegExp(name, 'i');
        if (cpf) filter.cpf = cpf;
        if (phone) filter.phone = new RegExp(phone, 'i');
        if (company_id) filter.company_id = company_id;
        
        const mechanics_b2b = await MechanicB2B.find(filter).select('_id id name cpf phone company_id');
        res.status(200).send(mechanics_b2b);
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
        const mechanic_b2b = await MechanicB2B.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!mechanic_b2b) return res.status(404).send();
        res.status(200).send(mechanic_b2b);
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
