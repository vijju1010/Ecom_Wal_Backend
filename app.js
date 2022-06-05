const db = require('./models');
const { roles, users, products } = db;
products.findAll().then((data) => {
    data.forEach((element) => {
        console.log(element.dataValues);
    });
});
