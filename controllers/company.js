const Company = require('../models/company');
const Messages = require('../errormessages/messages');

async function createCompany(req, res) {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).send({ message: Messages.CREATED_COMPANY, company });
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

async function getAllCompanies(req, res) {
    try {
        const { id, name, cnpj } = req.query;
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (name) filter.name = new RegExp(name, 'i');
        if (cnpj) filter.cnpj = cnpj;
        
        const companies = await Company.find(filter).select('_id id name cnpj');
        res.status(200).send(companies);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCompanyById(req, res) {
    try {
        const company = await Company.findOne({ id: req.params.id }).select('-id');
        if (!company) {
            return res.status(404).json({ error: Messages.NOT_FOUND_COMPANY });
        }
        res.status(200).send(company);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateCompany(req, res) {
    try {
        const company = await Company.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!company) return res.status(404).send();
        res.status(200).send(company);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteCompany(req, res) {
    try {
        const company = await Company.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!company) return res.status(404).send();
        res.status(200).send(company);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};
