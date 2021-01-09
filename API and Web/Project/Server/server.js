const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 
// let authController = require('./api/v1/controller/loginController');
// let flightController = require("./api/v1/controller/flightController");
// const locationController = require("./api/v1/controller/locationController");
const { response } = require("express");
let cors = require('cors');
const apiVersion1 = require("./api/v1/api");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware
// parse application/json
app.use(bodyParser.json()) // middleware
app.use(cors());

app.use("/v1", apiVersion1);


app.listen(port, (err) => {
    if(err){
        throw err;
    }
    console.log("Listening to Port", port);
});