const express = require("express");
const { Client } = require('pg');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 
const db = require('../Server/api/v1/database');
let authController = require('./api/v1/controller/loginController');
let flightController = require("./api/v1/controller/flightController");
const { response } = require("express");
let cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware
// parse application/json
app.use(bodyParser.json()) // middleware
app.use(cors());


app.post('/login', authController.authUser);

// app.use((req,res,next) => {
//     if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
//         jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err,decode) => {
//             if(err) {
//                 return res.status(401).json({message:'Unauthorized user'})
//             } else {
//                 req.user = decode;
//                 next();
//             }
//         })
//     } else {
//         return res.status(401).json({message:'Unauthorized user'});
//     }
// });

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// client.connect();
app.get('/', (request, response) => {
    response.json({ info: 'API Server is up and running, please request a valid user token.' })
  })

app.get("/getFlight", flightController.validFlightData);   


// app.get("/getAllFlights", (req,res) =>{
//     client.query("SELECT * FROM covid_flights", (err, result) =>{
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
//     let flight_id = req.body.flight_id;
//     let flight_date = req.body.flight_date;
//     let to_city = req.body.to_city;
//     let from_city = req.body.from_city;
//     let flight_company = req.body.flight_company;
//     console.log("primary key = " +flight_id+ " "+ flight_date);
//     client.query({
//         text: "INSERT INTO covid_flights (flight_id, flight_date, to_city, from_city, flight_company) VALUES($1, $2, $3, $4, $5);",
//         values: [flight_id, flight_date, to_city, from_city, flight_company]
//     });
// })


app.listen(port, (err) => {
    if(err){
        throw err;
    }
    console.log("Listening to Port", port);
});