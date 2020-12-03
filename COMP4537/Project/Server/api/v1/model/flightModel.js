let db = require('../database');

function findFlight(flightNo) {
    return db.query(`Select * from covid_flights where flight_id ='${flightNo}'`);
}

module.exports = {
    findFlight : findFlight
}