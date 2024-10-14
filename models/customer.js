const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const {v4 : uuidv4 } = require('uuid');

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.CHAR(11),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
  }
}, {
  timestamps: false,
  tableName: 'customer',
});

module.exports = Customer;
