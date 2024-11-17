const Company = require('../models/company');
const Messages = require('../errormessages/messages');
const { Op } = require('sequelize');

async function createCompany(req, res) {
    try {
      const {name, cnpj, address, phone} = req.body;
      const companyData ={
        name, 
        cnpj,
        address,
        phone
      }
      if(req.file) {
        companyData.image = req.file.buffer;
      }

      const company = Company.create(companyData);
      res.status(201).send({
        id: company._id,
        name: company.name,
        cnpj: company.cnpj,
        address: company.address,
        phone: company.phone,
    });
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

async function getAllCompanies(req, res) {
    try {
        const { id, name, cnpj } = req.query;
        console.log(req.query);
        
        const whereClause = {};

        if (id) {
            const companiesIdArray = id.split(',');
            if (companiesIdArray.length > 1) {
                
                whereClause.id = { [Op.in]: companiesIdArray }; 
            } else {
                
                whereClause.id = { [Op.eq]: id };
            }
        }

        if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
        if (cnpj) whereClause.cnpj = cnpj;

        const companies = await Company.findAll({
            where: whereClause,
            attributes: ['id', 'name', 'cnpj', 'image','address','phone','reviews_note'], 
        });

        res.status(200).send(companies);
    } catch (error) {
        console.log(error);
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
    const { id } = req.params;
    const { name, cnpj, phone, address, reviews_note } = req.body;
    const image = req.file ? req.file.buffer : undefined;

    try {
        if (id) {
            
            const company = await Company.findByPk(id);
            
            if (!company) {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }

           
            await Company.update({
                name: name || company.name,
                cnpj: cnpj || company.cnpj,
                phone: phone || company.phone,
                image: image || company.image,
                address: address || company.address,
                reviews_note: reviews_note || company.reviews_note
            }, {
                where: { id: id } 
            });

            res.status(200).send({ message: "Empresa atualizada" });
        } else {
            res.status(400).json({ error: "ID da empresa não fornecido" });
        }
    } catch (error) {
        console.error("Erro ao atualizar a empresa:", error);
        res.status(500).json({ error: "Erro ao atualizar a empresa" });
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
