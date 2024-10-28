const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Company = require('./company');
const {v4 : uuidv4 } = require('uuid');

const MechanicB2B = sequelize.define('mechanic_b2b', {
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
  },
  company_id: {
    type: DataTypes.UUID,
    references: {
      model: Company,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'mechanic_b2b',
});

MechanicB2B.beforeCreate(async (mechanic_b2b) => {
  if (mechanic_b2b.password) {
    const salt = await bcrypt.genSalt(10);
    mechanic_b2b.password = await bcrypt.hash(mechanic_b2b.password, salt);
  }
});

MechanicB2B.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = MechanicB2B;
