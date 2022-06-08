const db = require('./models');

const { roles, users, products, categories, cart, orders, order_products } = db;
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Auth = require('./routes/Auth');
const Admin = require('./routes/Admin');
const jsonParser = bodyParser.json();
app.use(jsonParser);
const port = 3000;
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/auth', Auth);
app.use('/admin', Admin);

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
    // console.log(req.body, 'req.body');
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
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
                            success: true,
                            category: data,
                        });
                    })
                    .catch((err) => {
                        res.json({
                            success: false,
                            message: err,
                        });
                    });
            }
        }
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
            // console.log(data, 'data');
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
app.get('/api/product/:productId', (req, res) => {
    products
        .findOne({
            where: {
                id: req.params.productId,
            },
        })
        .then((data) => {
            // console.log(data, 'data');
            res.json({
                success: true,
                product: data,
            });
        });
});
app.get('/api/cart', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    cart.findAll({
        where: {
            userId: decoded.id,
        },
    }).then((data) => {
        const productids = [];
        data.forEach((item, index) => {
            productids.push(item.dataValues.productId);
        });
        products
            .findAll({
                where: {
                    id: productids,
                },
            })
            .then((data) => {
                res.json({
                    success: true,
                    cart: data,
                });
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: err,
                });
            });
    });
});

app.post('/api/placeorder', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            const { productId } = req.body;
            console.log(productId, 'productId');
            users
                .findOne({
                    where: {
                        id: decoded.id,
                    },
                })
                .then((data) => {
                    console.log(data.id, 'id');
                    orders
                        .create({
                            userId: data.id,
                            status: 'Yet To Accept Order',
                            totalPrice: 10,
                        })
                        .then((order) => {
                            order_products
                                .create({
                                    orderId: order.id,
                                    productId: productId,
                                })
                                .then((data) => {
                                    console.log(data, 'data');
                                    res.json({
                                        success: true,
                                        message: 'Order placed successfully',
                                    });
                                });
                        });
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

app.get('/api/placedorders', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            users
                .findOne({
                    where: {
                        id: decoded.id,
                    },
                    attributes: ['id', 'name', 'email', 'phonenumber'],
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
                        placedorders: data,
                    });
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

app.post('/api/addtocart', (req, res) => {
    console.log(req.body, 'req.body');
    const { productId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token, 'token');
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log(err, 'err');
            res.json({
                success: false,
                message: 'Invalid token',
            });
        } else {
            const { id } = decoded;
            console.log(id);
            users
                .findOne({
                    where: {
                        id: id,
                    },
                })
                .then((data) => {
                    console.log(data.dataValues, 'data');
                    cart.findOrCreate({
                        where: {
                            userId: data.dataValues.id,
                            productId: productId,
                        },
                    }).then((data) => {
                        console.log(data, 'data');
                        res.json({
                            success: true,
                            message: 'Product added to cart',
                            cart: data,
                        });
                    });
                })
                .catch((err) => {
                    console.log(err, 'err');
                    res.json({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

app.delete('/api/cart/:productId', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            const { productId } = req.params;
            console.log(productId, 'productId');
            cart.destroy({
                where: {
                    productId: productId,
                    userId: decoded.id,
                },
            })
                .then((data) => {
                    console.log(data, 'data removed');
                    res.json({
                        success: true,
                        message: 'Product removed from cart',
                    });
                })
                .catch((err) => {
                    console.log(err, 'err');
                    res.json({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

app.delete('/api/cancelorder/:orderId', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            const { orderId } = req.params;
            console.log(orderId, 'orderId');
            order_products
                .destroy({
                    where: {
                        orderId: orderId,
                    },
                })
                .then((data) => {
                    orders
                        .destroy({
                            where: {
                                id: orderId,
                                userId: decoded.id,
                            },
                        })
                        .then((data) => {
                            console.log(data, 'data removed');
                            res.json({
                                success: true,
                                message: 'Order cancelled',
                            });
                        })
                        .catch((err) => {
                            console.log(err, 'err');
                            res.json({
                                success: false,
                                message: err,
                            });
                        });
                })
                .catch((err) => {
                    console.log(err, 'err');
                    res.json({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

module.exports = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
