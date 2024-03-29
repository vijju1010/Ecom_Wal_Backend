'use strict';
const { Model } = require('sequelize');
const products = require('../models/products');
const users = require('../models/users');
module.exports = (sequelize, DataTypes) => {
    class cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            cart.belongsTo(models.products, {
                foreignKey: 'id',
            });
            cart.belongsTo(models.users, {
                foreignKey: 'id',
            });
        }
    }
    cart.init(
        {
            productId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'cart',
        }
    );
    return cart;
};
