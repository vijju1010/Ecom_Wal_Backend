const db = require('../models');
const { roles, users, products, categories, cart, orders, order_products } = db;
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
    res.json({
        status: '200',
        message: 'Driver',
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
                                    status: 'Order Accepted Yet Pick Up from Store',
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
