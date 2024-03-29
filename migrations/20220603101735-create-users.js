'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                unique: 'uid_email',
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
            },
            phonenumber: {
                type: Sequelize.STRING,
            },
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
