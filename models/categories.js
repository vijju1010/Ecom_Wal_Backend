'use strict';
const { Model } = require('sequelize');
const products = require('../models/products');
module.exports = (sequelize, DataTypes) => {
    class categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            categories.hasMany(models.products, {
                foreignKey: 'categoryId',
            });
        }
    }
    categories.init(
        {
            categoryname: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'categories',
        }
    );
    return categories;
};
