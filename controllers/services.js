// controllers/serviceController.js
const Service = require('../models/service');
const Company = require('../models/company');
const CompanyService = require('../models/CompanyService');
const Messages = require('../errormessages/messages');
const { Op } = require('sequelize');
const { v4: isUuid } = require('uuid'); 

async function createService(req, res) {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).send({ message: Messages.CREATED_SERVICE, service });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function updateService(req, res) {
    const { id } = req.params; // ID do serviço
    const { id_company, description, company_name } = req.body;

    try {
        // Verificar se o serviço existe
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: Messages.NOT_FOUND_SERVICE });
        }

        // Atualizar o serviço com novos dados de descrição
        await service.update({ description });

        if (id_company) {
            // Verificar se a empresa existe
            const company = await Company.findByPk(id_company);
            if (!company) {
                return res.status(404).json({ error: Messages.NOT_FOUND_COMPANY });
            }

            // Verificar se a relação já existe
            const existingRelation = await CompanyService.findOne({
                where: { serviceId: id, companyId: id_company }
            });

            if (!existingRelation) {
                // Criar a nova relação se não existir
                await CompanyService.create({
                    serviceId: id,
                    companyId: id_company,
                    description: description,
                    company_name: company_name
                });
            } else {
                // Atualizar a descrição na relação existente
                await existingRelation.update({
                    description: description || existingRelation.description,
                    company_name: company_name || existingRelation.company_name
                });
            }
        }

        res.status(200).send({ message: Messages.UPDATED_SERVICE, service });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}


async function getAllServices(req, res) {
    try {
        const services = await Service.findAll();
        res.status(200).send(services);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function getAllServicesandCompanies(req, res) {
    try {
        const { serviceId, companyId, company_name } = req.query;

        const whereClause = {};
        
        // Condição para serviceId
        if (serviceId) {
            const serviceIdsArray = serviceId.split(','); 
            whereClause.serviceId = serviceIdsArray.length > 1 
                ? { [Op.in]: serviceIdsArray }
                : { [Op.iLike]: `%${serviceId}%` }; 
        }
        
        // Condição para companyId
        if (companyId) {
            whereClause.companyId = companyId.includes(',') 
                ? { [Op.in]: companyId.split(',') }
                : companyId;
        }

        // Condição para company_name
        if (company_name) {
            whereClause.company_name = { [Op.iLike]: `%${company_name}%` };
        }

        const services = await CompanyService.findAll({
            where: whereClause,
            attributes: ['serviceId', 'companyId', 'company_name'], 
        });

        console.log(services);
        res.status(200).send(services);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


module.exports = {
    createService,
    updateService,
    getAllServices,
    getAllServicesandCompanies
};
