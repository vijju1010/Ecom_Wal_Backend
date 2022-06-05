const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./models');
const { roles, users, categories, products } = db;

// select * from products where categoryId = 1;

// categories
//     .findAll({
//         include: [
//             {
//                 model: products,
//                 where: {
//                     categoryname: 'Electronics',
//                 },
//             },
//         ],
//     })
//     .then((data) => {
//         data.forEach((element) => {
//             console.log(element.dataValues);
//         });
//     });
(async () => {
    try {
        const password = bcrypt.hashSync('admin', saltRounds);
        await roles.create({
            rolename: 'admin',
        });
        await users.create({
            name: 'admin',
            email: 'admin@grep.com',
            phonenumber: '1234567890',
            password,
            roleId: 1,
        });
        console.log('Admin created successfully');
    } catch (error) {
        console.log('Admin created already');
    }
})();

// roles
//     .save({
//         rolename: 'admin',
//     })
//     .then(() => {
//         users
//             .save({
//                 name: 'admin',
//                 email: 'admin@grep.com',
//                 phonenumber: '1234567890',
//                 roleId: 1,
//             })
//             .then(() => {
//                 console.log('done');
//             });
//     });
// password = bcrypt.hashSync('admin', saltRounds);
// console.log(password);
// const decryptpassord = bcrypt.compare('admin', password);
// console.log(bcrypt.compareSync('admin', password));

// roles
//     .create({
//         rolename: 'admin',
//     })
//     .then(() => {
//         users
//             .create({
//                 name: 'admin',
//                 email: 'admin@grep.com',
//                 phonenumber: '1234567890',
//                 roleId: 1,
//             })
//             .then(() => {
//                 console.log('done');
//             });
//     });
