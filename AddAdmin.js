const db = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { roles, users } = db;
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
        console.log('done');
    } catch (error) {
        console.log(error);
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
