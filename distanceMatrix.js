var distance = require('google-distance-matrix');
// import distance from 'google-distance-matrix';
var GAPIKEY = require('./secret.js');
const getDistancesFromOrigin = (origin, destinations) => {
    console.log(origin, destinations);
    return new Promise((resolve, reject) => {
        distance.key(GAPIKEY.GAPIKEY);
        distance.units('imperial');
        distance.matrix(origin, destinations, function (err, distances) {
            console.log(distances, 'distances');
            if (err) {
                reject(err);
            }
            if (!distances) {
                reject('no distances');
            }
            if (distances.status == 'OK') {
                const routes = [];
                for (var i = 0; i < origin.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        const destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            const distance =
                                distances.rows[i].elements[j].distance.text;
                            routes.push({
                                origin: origin[i],
                                destination: destination,
                                distance: distance,
                            });
                        } else {
                            routes.push({
                                origin: origin[i],
                                destination: destination,
                                distance: 'not reachable',
                            });
                        }
                    }
                }
                resolve(routes);
            } else {
                reject(distances.status);
            }
        });
    });
};
module.exports = getDistancesFromOrigin;
// var origins = ['Gijaba, Andhra Pradesh, India'];
// var destinations = ['16.4344461,80.9931388', '18.7817162,83.42675179999999'];
// getDistancesFromOrigin(origins, destinations)
//     .then((distances) => {
//         console.log(distances);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
