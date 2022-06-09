const db = require('../models');
const { roles, users } = db;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const sendMail = require('../test.js');
app.use(jsonParser);

app.get('/', (req, res) => {
    res.send('AuthRouter');
});

app.post('/forgotpassword', (req, res) => {
    const { email } = req.body;
    users
        .findOne({
            where: {
                email: email,
            },
        })
        .then((user) => {
            console.log(user);
            if (user) {
                const token = jwt.sign(
                    {
                        email: user.email,
                    },
                    'secret',
                    {
                        expiresIn: '1h',
                    }
                );
                const link = `http://localhost:3001/resetpassword/${token}`;
                const mailOptions = {
                    from: 'pvijjj198@gmail.com',
                };
                mailOptions.subject = 'Reset Password';
                const text = `Hi user,\n\nPlease click on the below link to reset your password:\n\nIf you have not requested this, please ignore this email and your password will remain unchanged.\n\n`;

                try {
                    sendMail('Reset Password', text,link);
                    res.json({
                        success: true,
                        status: '200',
                        message: 'Email sent',
                    });
                } catch (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        status: '400',
                        message: 'Email not sent',
                    });
                }
            } else {
                res.json({
                    success: false,
                    status: '400',
                    message: 'Email not found',
                });
            }
        });
});

app.post('/resetpassword', (req, res) => {
    const { token, password } = req.body;
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                status: '400',
                message: 'Unauthorized',
            });
        } else {
            users
                .findOne({
                    where: {
                        email: decoded.email,
                    },
                })
                .then((user) => {
                    if (user) {
                        bcrypt.hash(password, 10, (err, hash) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    status: '400',
                                    message: 'Password not changed',
                                });
                            } else {
                                user.password = hash;
                                user.save();
                                res.json({
                                    success: true,
                                    status: '200',
                                    message: 'Password changed',
                                });
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            status: '400',
                            message: 'Email not found',
                        });
                    }
                });
        }
    });
});

app.post('/register', (req, res) => {
    const { name, email, password, phonenumber, role } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    roles
        .findOne({
            where: {
                rolename: role,
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
                            email: data.dataValues.email,
                            name: data.dataValues.name,
                            roleId: data.dataValues.roleId,
                        },
                        'secret'
                    );
                    // console.log(jwt.decode(token), 'token');
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

app.post('/login', (req, res) => {
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

app.get('/checkauth', (req, res) => {
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
module.exports = app;
