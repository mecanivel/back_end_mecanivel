const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt'); // Importando bcrypt para encriptação
const { v4: uuidv4 } = require('uuid');

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
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'customer',
});


Customer.beforeCreate(async (customer) => {
  if (customer.password) {
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
  }
});

module.exports = Customer;
