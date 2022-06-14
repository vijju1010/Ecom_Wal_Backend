const db = require('../models');
const {
    roles,
    users,
    products,
    driver_orders,
    categories,
    cart,
    orders,
    order_products,
} = db;
const sequelize = db.sequelize;
const Op = require('Sequelize').Op;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const getDistancesFromOrigin = require('../distanceMatrix.js');
app.use(jsonParser);

app.get('/', (req, res) => {
    res.json({
        status: '200',
        message: 'Driver',
    });
});

app.get('/getroutes/:id', (req, res) => {
    const { id } = req.params;
    console.log(id, 'id');
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Token is not valid',
            });
        } else {
            db.sequelize
                .query(
                    `SELECT orders.id as "orderId",products."productname",users."name",addresses.address,addresses."latLang",
                    users.phonenumber,orders.status,driver_orders."driverId"
                        from orders,users,products,order_products,addresses,driver_orders
                        where orders."userId"=users.id
                        AND orders.status='OUT_FOR_DELIVERY'
                        AND order_products."productId"=products.id 
                        AND orders.id=order_products."orderId"
                        AND orders."addressId"=addresses.id
                        AND orders.id=driver_orders."orderId"
                        AND driver_orders."driverId"=${id}`
                )
                .then((data) => {
                    if (data[0].length > 0) {
                        const routes = [];
                        const latLangs = data[0].map((item) => item.latLang);
                        const addresses = data[0].map((item) => item.address);
                        var origins = ['Gijaba, Andhra Pradesh, India'];
                        var destinations = latLangs.map(
                            (item) =>
                                JSON.parse(item).lat +
                                ',' +
                                JSON.parse(item).lng
                        );
                        getDistancesFromOrigin(origins, destinations)
                            .then((distances) => {
                                for (let i = 0; i < data[0].length; i++) {
                                    if (i === 0) {
                                        routes.push({
                                            orderId: data[0][i].orderId,
                                            address: data[0][i].address,
                                            distance: distances[i].distance,
                                            checked: false,
                                        });
                                    } else {
                                        routes.push({
                                            orderId: data[0][i].orderId,
                                            address: data[0][i].address,
                                            distance: distances[i].distance,
                                            checked: true,
                                        });
                                    }
                                }
                                routes.sort((a, b) =>
                                    a.distance.toLowerCase() >
                                    b.distance.toLowerCase()
                                        ? 1
                                        : -1
                                );

                                res.status(200).json({
                                    success: true,
                                    routes: routes,
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        console.log('no data');
                        res.status(200).json({
                            success: false,
                            message: 'No orders found',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});
app.post('/setorder', (req, res) => {
    console.log(req.body, 'req.body');
    const { orderId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Token is not valid',
            });
        } else {
            orders
                .update(
                    {
                        status: 'OUT_FOR_DELIVERY',
                    },
                    {
                        where: {
                            id: orderId,
                        },
                    }
                )
                .then((data) => {
                    driver_orders
                        .create({
                            driverId: decoded.id,
                            orderId: orderId,
                        })
                        .then((data) => {
                            res.status(200).json({
                                success: true,
                                message: 'Order updated',
                            });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        message: 'Error updating order',
                    });
                });
        }
    });
});

app.get('/getrouteorders/:id', (req, res) => {
    const { id } = req.params;
    console.log(id, 'id');
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Token is not valid',
            });
        } else {
            db.sequelize
                .query(
                    `SELECT orders.id as "orderId",products."productname",users."name",addresses.address,
                    users.phonenumber,orders.status,driver_orders."driverId"
                        from orders,users,products,order_products,addresses,driver_orders
                        where orders."userId"=users.id
                        AND orders.status='OUT_FOR_DELIVERY'
                        AND order_products."productId"=products.id 
                        AND orders.id=order_products."orderId"
                        AND orders."addressId"=addresses.id
                        AND orders.id=driver_orders."orderId"
                        AND driver_orders."driverId"=${id}`
                )
                .then((data) => {
                    if (data) {
                        console.log(data[0]);
                        res.status(200).json({
                            success: true,
                            orders: data[0],
                        });
                    } else {
                        console.log('no data');
                        res.status(200).json({
                            success: false,
                            message: 'No orders found',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});

app.get('/getreceivedorders/:driverId', (req, res) => {
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
            if (decoded.roleId === 3) {
                users
                    .findAll({
                        include: [
                            {
                                model: orders,
                                where: {
                                    status: {
                                        [Op.or]: [
                                            'ACCEPTED',
                                            'DELIVERED',
                                            'OUT_FOR_DELIVERY',
                                            'CANCELED',
                                        ],
                                    },
                                },

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
            }
        }
    });
});

module.exports = app;
