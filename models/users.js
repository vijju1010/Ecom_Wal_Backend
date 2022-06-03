'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    users.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phonenumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roleId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'users',
        }
    );
    return users;
};

// const db = require('../models/index');
// const { DataTypes,Sequelize } = require('sequelize');

// const sequelize=new Sequelize()

// const roles = require('../models/roles');
// const { DataTypes } = require('sequelize');

// const users = db.sequelize.define(
//     'users',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         phonenumber: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         roleId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     },
//     {
//         timestamps: false,
//         freezeTableName: true,
//     }
// );

// module.exports = users;
