'use strict';
const { Model } = require('sequelize');
const order_product = require('./order_products');
const cart = require('./cart');
const categories = require('./categories');

module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            products.belongsTo(models.categories, { foreignKey: 'id' });
            products.hasMany(models.cart, { foreignKey: 'productId' });
            // products.hasMany(models.order_products, {
            //     foreignKey: 'productId',
            // });
            products.belongsToMany(models.orders, {
                through: models.order_products,
                as: 'productOrders',
                foreignKey: 'productId',
            });
        }
    }
    products.init(
        {
            productname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            disabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'products',
        }
    );

    return products;
};
