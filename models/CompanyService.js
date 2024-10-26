// models/CompanyService.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const CompanyService = sequelize.define('CompanyService', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  serviceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'service',
      key: 'id'
    }
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'company',
      key: 'id'
    }
  },
  description:{
    type:DataTypes.UUID,
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
