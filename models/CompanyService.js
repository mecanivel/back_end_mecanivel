// models/CompanyService.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const CompanyService = sequelize.define('CompanyService', {
  id: {
    type: DataTypes.STRING(37),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  serviceId: {
    type: DataTypes.STRING(37),
    allowNull: false,
    references: {
      model: 'service',
      key: 'id'
    }
  },
  companyId: {
    type: DataTypes.STRING(37),
    allowNull: false,
    references: {
      model: 'company',
      key: 'id'
    }
  },
  description:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
  company_name:{
    type:DataTypes.STRING(50),
    allowNull:false,
  }
}, {
  timestamps: false,  
  tableName: 'company_service' 
});

module.exports = CompanyService;
