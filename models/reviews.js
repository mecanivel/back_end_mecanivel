const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Company = require('./company');
const Customer = require('./customer');


const Review = sequelize.define('review', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    description:{
        type: DataTypes.STRING(200),
        allowNull:false
    },
    grade:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    companyId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Company,
            key:'id',
        }
    },
    customerId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Customer,
            key:'id'
        },
    }

})

Company.hasMany(Review,{foreignKey:'companyId'});
Review.belongsTo(Company,{foreignKey:'companyId'});

Customer.hasMany(Review,{foreignKey:'companyId'});
Review.belongsTo(Customer,{foreignKey:'companyId'});

module.exports = Review;