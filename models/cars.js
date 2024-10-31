const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');
const Customer = require('./customer');

const Cars = sequelize.define('Cars', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    car_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    kms_driven: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pneu_status: {
        type: DataTypes.ENUM('RUIM', 'ESTÁVEL', 'BOM'),
        allowNull: true
    },
    oil_status: {
        type: DataTypes.ENUM('RUIM', 'ESTÁVEL', 'BOM'),
        allowNull: true
    },
    brake_pads_status: {
        type: DataTypes.ENUM('RUIM', 'ESTÁVEL', 'BOM'),
        allowNull: true
    },
    customer_id:{
        type:DataTypes.UUID,

    },
    image: {
        type: DataTypes.BLOB,  
        allowNull: true,       
      },
});

Cars.belongsTo(Customer,{foreignKey:'customer_id'});


module.exports = Cars;
