// orders
//     .create({
//         userId: decoded.id,
//         status: 'Yet To Accept Order',
//         address,
//         totalprice,
//     })
//     .then((data) => {
//         const orderProducts = [];
//         cart.findAll({
//             where: {
//                 userId: decoded.id,
//             },
//         }).then((data) => {
//             data.forEach((item, index) => {
//                 orderProducts.push({
//                     orderId: data.id,
//                     productId: item.dataValues.productId,
//                 });
//             });
//             order_products
//                 .bulkCreate(orderProducts)
//                 .then(() => {
//                     cart.destroy({
//                         where: {
//                             userId: decoded.id,
//                         },
//                     })
//                         .then(() => {
//                             res.json({
//                                 success: true,
//                                 message: 'Order Placed Successfully',
//                             });
//                         })
//                         .catch((err) => {
//                             res.json({
//                                 success: false,
//                                 message: err,
//                             });
//                         });
//                 })
//                 .catch((err) => {
//                     res.json({
//                         success: false,
//                         message: err,
//                     });
//                 });
//         });
//     })
//     .catch((err) => {
//         res.json({
//             success: false,
//             message: err,
//         });
//     });

// //################

// cart.findAll({
//     where: {
//         userId: decoded.id,
//     },
// }).then((data) => {
//     data.forEach((item, index) => {
//         orders
//             .create({
//                 userId: decoded.id,
//                 address,
//                 status: 'Yet To Accept Order',
//                 totalprice,
//             })
//             .then((data) => {
//                 order_products
//                     .create({
//                         orderId: data.dataValues.id,
//                         productId: item.dataValues.productId,
//                     })
//                     .catch((err) => {
//                         res.json({
//                             success: false,
//                             message: err,
//                         });
//                     });
//             });
//     });
//     cart.destroy({
//         where: {
//             userId: decoded.id,
//         },
//     })
//         .then((data) => {
//             res.json({
//                 success: true,
//                 message: 'Order placed successfully',
//             });
//         })
//         .catch((err) => {
//             res.json({
//                 success: false,
//                 message: err,
//             });
//         });
// });

// const db = require('./models');
// db.sequelize
//     .query(
//         `select * from products p,orders o,orderdetails d where o.id=d.order_id AND p.id=d.product_id`
//     )
//     .then((data) => {
//         if (data) {
//             res.status(200).json({
//                 success: true,
//                 receivedorders: data[0],
//             });
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     });

var distance = require('google-distance-matrix');

var origins = ['San Francisco CA'];
var destinations = [
    'New York NY',
    'Montreal',
    '41.8337329,-87.7321554',
    'Honolulu',
];
// console.log(origins);

const apiKey = require('./secret.js');
console.log(apiKey);
distance.key(apiKey);
distance.units('imperial');

distance.matrix(origins, destinations, function (err, distances) {
    console.log(distances);
    if (err) {
        return console.log(err);
    }
    if (!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i = 0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    console.log(
                        'Distance from ' +
                            origin +
                            ' to ' +
                            destination +
                            ' is ' +
                            distance
                    );
                } else {
                    console.log(
                        destination + ' is not reachable by land from ' + origin
                    );
                }
            }
        }
    }
});

const sendMsg = (msg) => {
    const accountSid = 'AC5db7c86f106db4734e34614f9bc485c2';
    const authToken = '[AuthToken]';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: msg,
            messagingServiceSid: 'MG47ed474609fdd7c18168a87abf8f6e5d',
            to: '+919110565212',
        })
        .then((message) => console.log(message.sid))
        .done();
};
// sendMsg('Hello');
