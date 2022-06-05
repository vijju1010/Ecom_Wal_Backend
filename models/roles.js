// const users = require('../models/users');
('use strict');
const { Model } = require('sequelize');
const users = require('../models/users');
module.exports = (sequelize, DataTypes) => {
    class roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            roles.hasMany(models.users, { foreignKey: 'roleId' });
        }
    }
    roles.init(
        {
            rolename: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'roles',
            freezeTableName: true,
        }
    );
    return roles;
};
