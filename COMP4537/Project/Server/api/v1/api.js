const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); 
let authController = require('./controller/loginController');
let flightController = require("./controller/flightController");
const locationController = require("./controller/locationController");
const { response } = require("express");
let cors = require('cors');

const api = express.Router();


// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false })) // middleware
// parse application/json
api.use(bodyParser.json()) // middleware
api.use(cors());


api.post('/login', authController.authUser);
api.post('/register', authController.register);

api.get('/', (request, response) => {
    response.json({ info: 'API Server is up and running, please request a valid user token.' })
  })

api.get("/getFlights", flightController.validFlightData);   

api.get("/getSingleFlight/:flight_id/:flight_date", flightController.validSingleFlightData);

api.get("/getCarrierFlights/:flight_company", flightController.validFlightCarrier);

api.get("/getArrival", flightController.validArrival);

api.get("/getDeparture", flightController.validDeparture);

api.post("/createFlightEntry", flightController.createFlight);

api.delete("/deleteFlightEntry", flightController.deleteFlight);

api.put("/updateFlightEntry", flightController.updateFlight);

api.get("/getAllLocations", locationController.validLocationData);

api.post("/inputUserLocation", locationController.validLocationEntry);

api.delete("/deleteuserLocation", locationController.deleteUserLocation);

api.get("/getUserLocations/:user_id", locationController.validUserLocations);


module.exports= api;