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


api.post('/login', authController.authUser); //used
api.post('/register', authController.register); //used

api.get('/', (request, response) => {
    response.json({ info: 'API Server is up and running, please request a valid user token.' })
  })

api.get("/getFlights", flightController.validFlightData);   //used

api.get("/getSingleFlight/:flight_id/:flight_date", flightController.validSingleFlightData); //used

api.get("/getCarrierFlights/:flight_company", flightController.validFlightCarrier); //to be implemented on tracking.html

api.get("/getArrival", flightController.validArrival);//to be implemented on tracking.html

api.get("/getDeparture", flightController.validDeparture);//to be implemented on tracking.html

api.post("/createFlightEntry", flightController.createFlight); //used

api.delete("/deleteFlightEntry", flightController.deleteFlight); //used

api.put("/updateFlightEntry", flightController.updateFlight); //used

api.get("/getAllLocations", locationController.validLocationData); //to be implemented on tracking.html

api.post("/inputUserLocation", locationController.validLocationEntry); //used

api.delete("/deleteuserLocation", locationController.deleteUserLocation); //to be implemented on tracking.html

api.get("/getUserLocations/:user_id", locationController.validUserLocations); //to be implemented on tracking.html


module.exports= api;