const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Messages = require('../errormessages/messages');
const MechanicB2B = require('../models/mechanic_b2b');
const Customer = require('../models/customer');
const Company = require('../models/company');

async function findUserByUsername(username) {
    let user = await MechanicB2B.findOne({ where: { username } });
    if (user) return { user, role: 'mechanic_b2b' };

    user = await Customer.findOne({ where: { username } });
    if (user) return { user, role: 'customer' };

    return null; 
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const result = await findUserByUsername(username);
        if (!result) {
            return res.status(404).send(Messages.NOT_FOUND_USER);
        }

        const { user, role } = result;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send(Messages.INVALID_PASSWORD);
        }

        const payload = {
            id: user.id,
            role: role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60m' });

        res.status(200).send({ message: Messages.SUCESSFUL_LOGIN, token });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { login };
