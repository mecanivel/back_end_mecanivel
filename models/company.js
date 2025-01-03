const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const {v4 : uuidv4 } = require('uuid');

const Company = sequelize.define('company', {
  id: {
    type: DataTypes.UUID,
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
  phone: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,  
    allowNull: true,       
  },
  address:{
    type:DataTypes.STRING(80),
    allowNull:false
  },
  reviews_note:{
    type:DataTypes.FLOAT,
    allowNull:true
  }
}, {
  timestamps: false,  
  tableName: 'company',
});

Company.associate = (models) => {
  Company.belongsToMany(models.Service, {
    through: models.CompanyService,
    as: 'services',
    foreignKey: 'companyId',
    otherKey: 'serviceId',
  });
};

module.exports = Company;
