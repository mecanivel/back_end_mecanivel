const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const {v4 : uuidv4 } = require('uuid');

const Company = sequelize.define('company', {
  id: {
    type: DataTypes.STRING(37),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.CHAR(14),
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,  
    allowNull: true,       
  }
}, {
  timestamps: false,  
  tableName: 'company',
});

module.exports = Company;
