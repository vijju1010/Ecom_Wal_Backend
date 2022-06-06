const db = require('./models');

const { roles, users, products, categories } = db;
// products.findAll().then((data) => {
//     data.forEach((element) => {
//         console.log(element.dataValues);
//     });
// });
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
app.use(jsonParser);
const port = 3000;
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/api/categories', (req, res) => {
    categories
        .findAll()
        .then((data) => {
            res.json({
                success: true,
                categories: data,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err,
            });
        });
});
app.post('/api/categories', (req, res) => {
    console.log(req.body, 'req.body');
    categories
        .create({
            categoryname: req.body.category,
        })
        .then((data) => {
            console.log(data, 'data');
            res.json({
                success: true,
                message: 'Category created successfully',
                category: data,
            });
        })
        .catch((err) => {
            console.log(err, 'err');
            res.json({
                success: false,
                message: err,
            });
        });
});

app.post('/api/products', (req, res) => {
    console.log(req.body, 'req.body');
    products
        .create({
            productname: req.body.productname,
            price: req.body.price,
            categoryId: req.body.categoryId,
        })
        .then((data) => {
            res.json({
                success: true,
                message: 'Product created successfully',
                product: data,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err,
            });
        });
});

app.put('/api/products/:productId/disable', (req, res) => {
    const { productId } = req.params;
    // console.log(productId, req.body.disabled, 'productId');
    products
        .update(
            {
                disabled: !req.body.disabled,
            },
            {
                where: {
                    id: req.params.productId,
                },
                returning: true,
                plain: true,
            }
        )
        .then((data) => {
            // console.log(data[1].dataValues, 'data');
            res.json({
                product: data[1].dataValues,
                success: true,
                message: 'Product disabled successfully',
            });
        })
        .catch((err) => {
            // console.log(err, 'err');
            res.json({
                success: false,
                message: err,
            });
        });
});

app.get('/api/products/:id', (req, res) => {
    products
        .findAll({
            where: {
                categoryId: req.params.id,
            },
        })
        .then((data) => {
            res.json({
                success: true,
                products: data,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err,
            });
        });
});

app.post('/api/register', (req, res) => {
    const { name, email, password, phonenumber } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    roles
        .findOne({
            where: {
                rolename: 'user',
            },
        })
        .then((data) => {
            users
                .create({
                    name,
                    email,
                    password: passwordHash,
                    phonenumber,
                    roleId: data.id,
                })
                .then((data) => {
                    console.log(data);
                    token = jwt.sign(
                        {
                            id: data.dataValues.id,
                            name: data.dataValues.name,
                            email: data.dataValues.email,
                            roleId: data.dataValues.roleId,
                        },
                        'secret'
                    );
                    res.json({
                        success: true,
                        message: 'User created successfully',
                        user: data.dataValues,
                        token,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        success: false,
                        message: err,
                    });
                });
        });
});

app.post('/api/login', (req, res) => {
    // console.log(req.body, 'req.body');
    const { email, password } = req.body;
    users
        .findOne({
            where: {
                email,
            },
        })
        .then((data) => {
            if (data) {
                // console.log(data.dataValues.password, 'data');
                const isValid = bcrypt.compareSync(
                    password,
                    data.dataValues.password
                );
                // console.log(isValid, 'isValid');
                if (isValid) {
                    // console.log('valid');
                    const token = jwt.sign(
                        {
                            id: data.id,
                            email: data.email,
                            name: data.name,
                            roleId: data.roleId,
                        },
                        'secret'
                        // {
                        //     expiresIn: '1h',
                        // }
                    );
                    // console.log(data.dataValues, 'data');
                    res.status(200).json({
                        success: true,
                        user: data.dataValues,
                        token,
                        message: 'Login Successful',
                        data: data.dataValues,
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid Credentials',
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Invalid Credentials',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error occured',
            });
        });
});

app.get('/api/checkauth', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: 'Invalid Token',
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Token Valid',
                data: decoded,
            });
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
