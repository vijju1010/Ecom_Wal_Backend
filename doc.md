/api/categories GET - Get all categories
/api/categories POST - Create a new category
/api/products POST - Create a new product
[] productname
[] price
[] categoryid
/api/products/:id GET - Get a products by categoryId


app.get('/api/receivedorders', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        } else {
            console.log(decoded.roleId);
            if (decoded.roleId === 1) {
                users
                    .findAll({
                        include: [
                            {
                                model: orders,
                                include: [
                                    {
                                        model: products,
                                        through: {
                                            attributes: ['id'],
                                        },
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