const express = require("express");
const { Client } = require('pg');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 



const client = new Client({
    connectionString: 'postgres://aikjuhrslzfqdy:1eff92bd85c4d2a83815f6a4c9a798e1936618bd992cae4f9487b0e873d09cf7@ec2-3-91-139-25.compute-1.amazonaws.com:5432/degs61trjel83u',
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })

async function displayFlightData(){
    console.log('in db.js');
    let data = await client.query(`Select * from covid_flights ORDER BY flight_date DESC`, (err, result)=>{
        if (err) throw err;
        console.log(result);
    });

    // console.log(data);
    return data;
}
  
module.exports={
    displayFlightData
}