'use strict';
const { Model } = require('sequelize');
const order_products = require('../models/order_products');
const order_product = require('../models/order_products');
const users = require('../models/users');
module.exports = (sequelize, DataTypes) => {
    class orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // orders.hasMany(models.order_products, {
            //     foreignKey: 'orderId',
            // });
            orders.belongsTo(models.users, { foreignKey: 'userId' });
            orders.belongsToMany(models.products, {
                through: models.order_products,
                as: 'orderProducts',
                foreignKey: 'orderId',
            });
            orders.belongsTo(models.addresses, { foreignKey: 'id' });
            orders.hasMany(models.driver_orders, { foreignKey: 'orderId' });
        }
    }
    orders.init(
        {
            userId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            addressId: DataTypes.INTEGER,
            totalprice: DataTypes.DOUBLE,
        },
        {
            sequelize,
            modelName: 'orders',
        }
    );
    return orders;
};
