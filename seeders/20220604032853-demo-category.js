'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   categoryname: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'categories',
            [
                {
                    categoryname: 'Electronics',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    categoryname: 'Fashion',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    categoryname: 'Home & Garden',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    categoryname: 'Sports & Outdoors',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    categoryname: 'Toys & Games',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // {
                //     categoryname: 'Health & Beauty',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Automotive',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Baby',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Books',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Clothing',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Computers',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Home & Kitchen',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Music',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Office',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Pet Supplies',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Sporting Goods',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Toys',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Video Games',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Watches',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
                // {
                //     categoryname: 'Other',
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
