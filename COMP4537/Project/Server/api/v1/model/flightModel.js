const {
  resolve
} = require('path');
const db = require('../database');


findAllFlights = async () => {
  console.log('inside flightModel');
  return await db.pool.query('SELECT * from covid_flights');
};

// example of what would work : flight_id = '44' and flight_date = '2020-11-27'
findSingleFlight = (flight_id, flight_date) => {
  console.log('flightModel');
  return new Promise((resolve, reject) => {
    db.pool.query('SELECT * from covid_flights WHERE flight_id = ' + flight_id + ' and flight_date = ' + flight_date,
      (error, results) => {
        if (error) {
          reject('Entry not found' + error);
        }
        console.log(results.rows);
        resolve(results.rows);
      }
    );
  });
}


findAllCarriers = async (flight_company) => {
  console.log('flightModel');
  return await db.pool.query('SELECT * from covid_flights WHERE flight_company = ' + flight_company);
}

findArrival = async () => {
  console.log('flightModel');
  let city = '\'Vancouver\'';
  return await db.pool.query('SELECT * from covid_flights WHERE to_city = ' + city);
}

findDeparture = async () => {
  console.log('flightModel');
  let city = '\'Vancouver\'';
  return await db.pool.query('SELECT * from covid_flights WHERE from_city = ' + city);
}

createFlightEntry = async (flight_id, flight_date, to_city, from_city, flight_company) => {
    return await db.pool.query({
      text: "INSERT INTO covid_flights (flight_id, flight_date, to_city, from_city, flight_company) VALUES($1, $2, $3, $4, $5);",
      values: [flight_id, flight_date, to_city, from_city, flight_company]
  });
}

deleteFlightEntry = async (flight_id, flight_date) => {
  return await db.pool.query({
    text: "DELETE FROM covid_flights WHERE flight_id = $1 AND flight_date = $2;",
    values: [flight_id, flight_date]
});
}

module.exports = {
  findAllFlights: findAllFlights,
  findSingleFlight: findSingleFlight,
  findAllCarriers: findAllCarriers,
  findArrival: findArrival,
  findDeparture: findDeparture,
  createFlightEntry: createFlightEntry,
  deleteFlightEntry: deleteFlightEntry
}