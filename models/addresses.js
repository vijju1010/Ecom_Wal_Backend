'use strict';
const { Model } = require('sequelize');
const users = require('../models/users');
module.exports = (sequelize, DataTypes) => {
    class addresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            addresses.belongsTo(models.users, { foreignKey: 'id' });
            addresses.hasMany(models.driver_orders, {
                foreignKey: 'addressId',
            });
            addresses.hasMany(models.orders, { foreignKey: 'addressId' });
        }
    }
    addresses.init(
        {
            address: DataTypes.STRING,
            pincode: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'addresses',
        }
    );
    return addresses;
};
