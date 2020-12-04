const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 
let flightController = require("./api/v1/controller/flightController");
const { response } = require("express");
const flightModel = require("./api/v1/model/flightModel");

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.json({ info: 'API Server is up and running, please request a valid user token.' })
  })

app.get("/getFlight", flightController.validFlightData);   

app.get("/getSingleFlight/:flight_id/:flight_date", flightController.validSingleFlightData);

app.get("/getCarrierFlights/:flight_company", flightController.validFlightCarrier);

app.get("/getArrival", flightController.validArrival);

app.get("/getDeparture", flightController.validDeparture);

app.post("/createFlightEntry", flightController.createFlight);

app.delete("/deleteFlightEntry", flightController.deleteFlight);

// app.get("/getAllFlights", (req,res) =>{
//     db.pool.query("SELECT * FROM covid_flights", (err, result) =>{
//         if (err) throw err;
//         console.log(result.rows);
//         res.json(result.rows);
//         return result.rows;
//     })
// })

// app.get("/getUser", (req,res) =>{
//     client.query("SELECT * FROM covid_flights", (err, result) =>{
//         if (err) throw err;
//         console.log(result.rows);
//         res.json(result.rows);
//         return result.rows;
//     })
// })
// app.use(bodyParser.json()); 
// app.post("/flight", (req,res) => {
    // let flight_id = req.body.flight_id;
    // let flight_date = req.body.flight_date;
    // let to_city = req.body.to_city;
    // let from_city = req.body.from_city;
    // let flight_company = req.body.flight_company;
//     console.log("primary key = " +flight_id+ " "+ flight_date);
    // client.query({
    //     text: "INSERT INTO covid_flights (flight_id, flight_date, to_city, from_city, flight_company) VALUES($1, $2, $3, $4, $5);",
    //     values: [flight_id, flight_date, to_city, from_city, flight_company]
    // });
// })


app.listen(port, (err) => {
    if(err){
        throw err;
    }
    console.log("Listening to Port", port);
});