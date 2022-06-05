const db = require('./models');
const { roles, users, products } = db;
// products.findAll().then((data) => {
//     data.forEach((element) => {
//         console.log(element.dataValues);
//     });
// });
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    users
        .findOne({
            where: {
                email,
            },
        })
        .then((data) => {
            if (data) {
                const isValid = bcrypt.compareSync(password, data.password);
                if (isValid) {
                    const token = jwt.sign(
                        {
                            id: data.id,
                            email: data.email,
                            name: data.name,
                            roleId: data.roleId,
                        },
                        'secret',
                        {
                            expiresIn: '1h',
                        }
                    );
                    console.log(data.dataValues);
                    res.status(200).json({
                        success: true,
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
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
