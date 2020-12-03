let db = require('../database');

function findAllFlights() {
    console.log('inside flightModel');
    return db.displayFlightData();
}

module.exports = {
    findAllFlights
}