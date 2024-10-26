const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Customer = require('./customer');
const Company = require('./company');
const MechanicB2B = require('./mechanic_b2b');
const {v4 : uuidv4 } = require('uuid');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  customer_id: {
    type: DataTypes.UUID,
    references: {
      model: Customer,
      key: 'id',
    },
  },
  company_id: {
    type: DataTypes.UUID,
    references: {
      model: Company,
      key: 'id',
    },
  },
  mechanic_b2b_id: {
    type: DataTypes.UUID,
    references: {
      model: MechanicB2B,
      key: 'id',
    },
  },
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
  },
}, {
  timestamps: false,
  tableName: 'orders',
});


Order.belongsTo(Customer, { foreignKey: 'customer_id' });
Order.belongsTo(Company, { foreignKey: 'company_id' });
Order.belongsTo(MechanicB2B, { foreignKey: 'mechanic_b2b_id' });

module.exports = Order;
