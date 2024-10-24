// controllers/serviceController.js
const Service = require('../models/service');
const Company = require('../models/company');
const CompanyService = require('../models/CompanyService');
const Messages = require('../errormessages/messages');
const { Op } = require('sequelize');

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
    console.log(req.body);
    
    const { id } = req.params;
    const { id_company, description, company_name, ...serviceData } = req.body;
    console.log(id);
    console.log("logando id company",id_company);
    
    try {
        
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: Messages.NOT_FOUND_SERVICE });
        }
        
        await service.update(serviceData);

        
        if (id_company) {
            const company = await Company.findByPk(id_company);
            if (!company) {
                return res.status(404).json({ error: Messages.NOT_FOUND_COMPANY });
            }

           
            const existingRelation = await CompanyService.findOne({
                where: { serviceId: id, companyId: id_company }
            });

            if (!existingRelation) {
                await CompanyService.create({
                    serviceId: id,
                    companyId: id_company,
                    description:description,
                    company_name:company_name
                });
            }else {
                await existingRelation.update({description:description || existingRelation.description});
            }
        }

        res.status(200).send({ message: Messages.UPDATED_SERVICE, service });
    } catch (error) {
        console.log(error);
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
            if (serviceId) {
                const serviceIdsArray = serviceId.split(','); 
                if (serviceIdsArray.length > 1) {
                    whereClause.serviceId = { [Op.in]: serviceIdsArray }; 
                } else {
                    whereClause.serviceId = { [Op.iLike]: `%${serviceId}%` }; 
                }
            }
           
            if (companyId) {
                if (Array.isArray(companyId)) {
                    whereClause.companyId = { [Op.in]: companyId };  
                } else {
                    whereClause.companyId = { [Op.iLike]: `%${companyId}%` };  
                }
            }
    
            
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
