const db = require('../models');
const { roles, users, products, categories, cart, orders, order_products } = db;
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const sendMail = require('../test.js');
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
    res.json({
        status: '200',
        message: 'Admin',
    });
});

app.post('/categories', (req, res) => {
    // console.log(req.body, 'req.body');
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token, 'token');
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                // console.log('error occured');
                res.json({
                    status: '401',
                    success: false,
                    message: 'Unauthorized',
                });
            } else {
                if (decoded.roleId === 1) {
                    categories
                        .findOrCreate({
                            where: {
                                categoryname: req.body.category,
                            },
                            defaults: {
                                categoryname: req.body.categoryname,
                            },
                        })
                        .then((data) => {
                            res.json({
                                status: '200',
                                success: true,
                                message: 'Category added successfully',
                                category: data,
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: '401',
                                success: false,
                                message: 'Unauthorized',
                            });
                        });
                }
            }
        });
    } catch (err) {
        res.status(401).json({
            status: '401',
            success: false,
            message: 'Unauthorized',
        });
    }
});

app.post('/products', (req, res) => {
    console.log(req.body, 'req.body');
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            if (decoded.roleId === 1) {
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
            } else {
                res.json({
                    success: false,
                    message: 'You are not authorized to perform this action',
                });
            }
        }
    });
});

app.put('/products/:productId/disable', (req, res) => {
    const { productId } = req.params;
    // console.log(productId, req.body.disabled, 'productId');
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            if (decoded.roleId === 1) {
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
            } else {
                res.json({
                    success: false,
                    message: 'You are not authorized to perform this action',
                });
            }
        }
    });
});

app.get('/receivedorders', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            console.log(decoded.roleId, 'decoded.roleId');
            if (decoded.roleId === 1) {
                users
                    .findAll({
                        include: [
                            {
                                model: orders,
                                include: [
                                    {
                                        as: 'orderProducts',
                                        model: products,
                                    },
                                ],
                            },
                        ],
                    })
                    .then((data) => {
                        res.json({
                            success: true,
                            orders: data,
                        });
                    });
            } else {
                res.json({
                    success: false,
                    message: 'You are not authorized to view this page',
                });
            }
        }
    });
});

app.put('/setorderstatus/:orderId', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log(err, 'err');
            res.json({
                success: false,
                message: err,
            });
        } else {
            if (
                decoded.roleId === 1 ||
                decoded.roleId === 3 ||
                (decoded.roleId === 2 && req.body.status === 'CANCELED')
            ) {
                orders
                    .update(
                        {
                            status: req.body.status,
                        },
                        {
                            where: {
                                id: req.params.orderId,
                            },
                            returning: true,
                            plain: true,
                        }
                    )
                    .then((data) => {
                        res.json({
                            success: true,
                            message: 'Order status updated successfully',
                        });
                    })
                    .catch((err) => {
                        res.json({
                            success: false,
                            message: err,
                        });
                    });
            } else {
                console.log('You are not authorized to perform this action');
                res.json({
                    success: false,
                    message: 'You are not authorized to perform this action',
                });
            }
        }
    });
});

module.exports = app;
