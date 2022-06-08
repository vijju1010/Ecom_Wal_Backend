'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class driver_orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            driver_orders.belongsTo(models.users, {
                foreignKey: 'id',
            });
            driver_orders.hasOne(models.orders, {
                foreignKey: 'id',
            });
        }
    }
    driver_orders.init(
        {
            driverId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending',
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'driver_orders',
        }
    );
    return driver_orders;
};
