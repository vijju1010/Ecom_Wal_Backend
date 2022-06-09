orders
    .create({
        userId: decoded.id,
        status: 'Yet To Accept Order',
        address,
        totalprice,
    })
    .then((data) => {
        const orderProducts = [];
        cart.findAll({
            where: {
                userId: decoded.id,
            },
        }).then((data) => {
            data.forEach((item, index) => {
                orderProducts.push({
                    orderId: data.id,
                    productId: item.dataValues.productId,
                });
            });
            order_products
                .bulkCreate(orderProducts)
                .then(() => {
                    cart.destroy({
                        where: {
                            userId: decoded.id,
                        },
                    })
                        .then(() => {
                            res.json({
                                success: true,
                                message: 'Order Placed Successfully',
                            });
                        })
                        .catch((err) => {
                            res.json({
                                success: false,
                                message: err,
                            });
                        });
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        message: err,
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

//################

cart.findAll({
    where: {
        userId: decoded.id,
    },
}).then((data) => {
    data.forEach((item, index) => {
        orders
            .create({
                userId: decoded.id,
                address,
                status: 'Yet To Accept Order',
                totalprice,
            })
            .then((data) => {
                order_products
                    .create({
                        orderId: data.dataValues.id,
                        productId: item.dataValues.productId,
                    })
                    .catch((err) => {
                        res.json({
                            success: false,
                            message: err,
                        });
                    });
            });
    });
    cart.destroy({
        where: {
            userId: decoded.id,
        },
    })
        .then((data) => {
            res.json({
                success: true,
                message: 'Order placed successfully',
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: err,
            });
        });
});
