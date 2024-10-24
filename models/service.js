const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const {v4 : uuidv4 } = require('uuid');

const Service = sequelize.define('service', {
  id: {
    type: DataTypes.STRING(37),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,  
  tableName: 'service',
});

  
Service.associate = (models) => {
    Service.belongsToMany(models.Company, {
      through: models.CompanyService,
      as: 'companies',
      foreignKey: 'serviceId',
      otherKey: 'companyId',
    });
  };

module.exports = Service;
