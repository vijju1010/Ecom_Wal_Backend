'use strict';

const categories = [
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
];

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'products',
            [
                {
                    productname: 'Apple iPhone XR (64GB) - Black',
                    price: 999.0,
                    categoryId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname: 'Apple iPhone XR (64GB) - Silver',
                    price: 999.0,
                    categoryId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname: 'Apple iPhone XR (64GB) - Gold',
                    price: 999.0,
                    categoryId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname: 'T-shirt',
                    price: 10.0,
                    categoryId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname: 'Solid Men Round Neck Black,',
                    price: 10.0,
                    categoryId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname:
                        'MILTON CHIC-2 Stainless Steel Tiffin Lunch Box ',
                    price: 100.0,
                    categoryId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname: 'Craft Junction Lord Gautam Buddha Art ',
                    price: 100.0,
                    categoryId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname:
                        'Adrenex by Flipkart Poplar Willow, Tennis Ball Cricket Bat for Kids',
                    price: 1400.0,
                    categoryId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productname:
                        'SBM Badminton Racquet Set Of 2 Piece With 6 Piece With Nylon Shuttle Cock Badminton Kit',
                    price: 2400.0,
                    categoryId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
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
