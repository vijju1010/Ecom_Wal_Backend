'use strict';
const { Model } = require('sequelize');
const orders = require('../models/orders');
const products = require('../models/products');

module.exports = (sequelize, DataTypes) => {
    class order_products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            order_products.belongsTo(models.orders, {
                foreignKey: 'id',
            });
            order_products.belongsTo(models.products, {
                foreignKey: 'id',
            });
        }
    }
    order_products.init(
        {
            orderId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'order_products',
        }
    );
    return order_products;
};
