const { resolve } = require('path');
let db = require('../database');


findAllFlights = () =>{
    console.log('inside flightModel');
    return new Promise((resolve, reject) => {
        db.pool.query('SELECT * from covid_flights',
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results.rows);
          }
        );
      });
    }

      


module.exports = {
    findAllFlights : findAllFlights
}